const swaggerOptions = {
    swaggerDefinition: {
        info: {
            title: 'Anime Experience - AnEx',
            description:
                'API para desenvolvimento da aplicação para streaming de mídia focada em animes',
            contact: {
                name: 'Guilherme Luiz Lange',
                email: 'gui.luizlange@gmail.com',
            },
            version: '1.0.0',
        },
        servers: [
            {
                url: 'http://localhost:3333',
                description: 'API Homolog',
            },
            {
                url: 'https://anexserver.herokuapp.com',
                description: 'ÄPI Production',
            },
        ],
    },
    apis: ['../server.ts'],
};

export default swaggerOptions;
