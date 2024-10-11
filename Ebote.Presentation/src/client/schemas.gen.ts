// This file is auto-generated by @hey-api/openapi-ts

export const AccountModelSchema = {
    required: ['login', 'passwordHash'],
    type: 'object',
    properties: {
        login: {
            type: 'string',
            nullable: true
        },
        passwordHash: {
            type: 'string',
            nullable: true
        }
    },
    additionalProperties: false
} as const;

export const LobbySchema = {
    required: ['creator'],
    type: 'object',
    properties: {
        id: {
            type: 'string',
            format: 'uuid',
            readOnly: true
        },
        createdAt: {
            type: 'string',
            format: 'date-time',
            readOnly: true
        },
        creator: {
            '$ref': '#/components/schemas/Profile'
        }
    },
    additionalProperties: false
} as const;

export const MagicTypeSchema = {
    enum: [0, 1, 2, 3],
    type: 'integer',
    format: 'int32'
} as const;

export const ProfileSchema = {
    type: 'object',
    properties: {
        id: {
            type: 'string',
            format: 'uuid',
            readOnly: true
        },
        activeLobby: {
            '$ref': '#/components/schemas/Lobby'
        },
        lobbies: {
            type: 'array',
            items: {
                '$ref': '#/components/schemas/Lobby'
            },
            nullable: true
        }
    },
    additionalProperties: false
} as const;

export const SideTypeSchema = {
    enum: [0, 1],
    type: 'integer',
    format: 'int32'
} as const;

export const WizardModelSchema = {
    required: ['name'],
    type: 'object',
    properties: {
        name: {
            type: 'string',
            nullable: true
        },
        sideType: {
            '$ref': '#/components/schemas/SideType'
        },
        magicType: {
            '$ref': '#/components/schemas/MagicType'
        }
    },
    additionalProperties: false
} as const;