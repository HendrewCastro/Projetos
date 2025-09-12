const { Client, LocalAuth } = require('whatsapp-web.js');
const readline = require('readline');
const qrcode = require('qrcode-terminal');
const process = require('process');
const fs = require('fs');

// Set max listeners to avoid warnings (temporary measure)
process.setMaxListeners(0);

// Create readline interface
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Initialize users and clients
const Users = [];
const clients = new Map();

const GROQ_API_KEY = 'YOUR_GROQ_API_KEY_HERE'; // Replace with your xAI API key
const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions'; // OpenAI-compatible endpoint

// Delete previous sessions (optional confirmation)
rl.question('Deseja apagar todas as sessões anteriores? (s/n): ', (answer) => {
    if (answer.toLowerCase() === 's') {
        try {
            fs.rmSync('./sessions', { recursive: true, force: true });
            console.log('Sessões anteriores apagadas.');
        } catch (error) {
            console.log('Nenhuma sessão anterior ou erro ao apagar:', error);
        }
    }
    menu();
});

function Cadastrar(clientId) {
    if (clients.has(clientId)) {
        console.log(`Cliente ${clientId} já existe.`);
        return;
    }

    const client = new Client({
        authStrategy: new LocalAuth({ clientId: clientId, dataPath: `./sessions/${clientId}` })
    });

    client.on('qr', qr => {
        console.log(`QR Code para ${clientId}:`);
        qrcode.generate(qr, { small: true });
    });

    client.on('ready', () => {
        console.log(`${clientId} está pronto!`);
    });

    client.on('message', async message => {
        const mensagem = message.body;
        let contact = null;
        try {
            contact = await message.getContact();
            console.log('Contato:', contact.pushname || contact.number || '??');
        } catch (error) {
            console.log('Erro ao obter contato:', error.message);
        }
        console.log(`Mensagem para ${clientId} de ${message.from}: ${mensagem}`);
        const messageChat = await message.getChat();

        if (contact && contact.pushname && client.info?.wid?.user) {
            if (
                (mensagem.toLowerCase() === `me chama no privado @${client.info.wid.user}` ||
                 mensagem.toLowerCase() === `@${client.info.wid.user} me chama no privado`) &&
                messageChat.isGroup
            ) {
                client.sendMessage(message.author, `Pode falar ${contact.pushname}`);
            }
        }
    });

    client.on('authenticated', () => {
        console.log(`${clientId} autenticado com sucesso!`);
    });

    client.on('disconnected', (reason) => {
        console.log(`Cliente ${clientId} desconectado: ${reason}`);
        clients.delete(clientId);
        client.destroy();
    });

    client.initialize().catch(err => {
        console.error(`Erro ao inicializar cliente ${clientId}:`, err);
        clients.delete(clientId);
    });

    clients.set(clientId, client);
}

function Listar() {
    console.log('\nLista de usuários atuais:');
    if (Users.length === 0) {
        console.log('Nenhum usuário criado.');
    } else {
        for (let i = 0; i < Users.length; i++) {
            console.log(`Usuário ${i + 1}: ${Users[i]}`);
        }
    }
}

function cleanup() {
    console.log('Encerrando todos os clientes...');
    for (const [clientId, client] of clients) {
        client.destroy();
        clients.delete(clientId);
    }
    rl.close();
    process.exit(0);
}

process.on('SIGINT', cleanup);
process.on('SIGTERM', cleanup);
process.on('SIGHUP', cleanup);

function menu() {
    console.log('\n=== MENU ===');
    console.log('1 - Adicionar novo usuário');
    console.log('2 - Listar usuários');
    console.log('3 - Sair');
    rl.question('Escolha uma opção (1/2/3): ', (opcao) => {
        if (opcao === '1') {
            console.log('Prompting for session name...');
            rl.question('Escreva um nome para a sessão ou (1) para um nome padrão: ', (opcao2) => {
                if (Users.includes(opcao2)) {
                    console.log('Já existe uma sessão com esse nome');
                    menu();
                    return;
                }

                let novoClientId;
                if (opcao2 === '1') {
                    novoClientId = `client${Users.length + 1}`;
                } else if (opcao2.trim() === '') {
                    console.log('Erro: Nome inválido. Tente novamente.');
                    menu();
                    return;
                } else {
                    novoClientId = opcao2;
                }

                console.log('Adicionando novo usuário...');
                Users.push(novoClientId);
                console.log(`Novo usuário criado: ${novoClientId}`);
                Cadastrar(novoClientId);
                menu();
            });
        } else if (opcao === '2') {
            Listar();
            menu();
        } else if (opcao === '3') {
            console.log('Encerrando...');
            cleanup();
        } else {
            console.log('Opção inválida. Responda com 1, 2 ou 3.');
            menu();
        }
    });
}
