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

export const AxisSchema = {
    type: 'object',
    properties: {
        x: {
            type: 'number',
            format: 'float'
        },
        y: {
            type: 'number',
            format: 'float'
        }
    },
    additionalProperties: false
} as const;

export const BulletSchema = {
    type: 'object',
    properties: {
        position: {
            '$ref': '#/components/schemas/Point'
        },
        height: {
            type: 'number',
            format: 'float'
        },
        width: {
            type: 'number',
            format: 'float'
        },
        leftTop: {
            '$ref': '#/components/schemas/Point'
        },
        leftBottom: {
            '$ref': '#/components/schemas/Point'
        },
        rightTop: {
            '$ref': '#/components/schemas/Point'
        },
        rightBottom: {
            '$ref': '#/components/schemas/Point'
        },
        center: {
            '$ref': '#/components/schemas/Point'
        },
        id: {
            type: 'string',
            format: 'uuid'
        },
        wizardId: {
            type: 'string',
            format: 'uuid'
        },
        sideType: {
            '$ref': '#/components/schemas/SideType'
        },
        magicType: {
            '$ref': '#/components/schemas/MagicType'
        },
        eyeDirection: {
            '$ref': '#/components/schemas/Axis'
        }
    },
    additionalProperties: false
} as const;

export const GameConstantsModelSchema = {
    type: 'object',
    properties: {
        startHitPoints: {
            type: 'number',
            format: 'float'
        },
        gameTickInMilliseconds: {
            type: 'integer',
            format: 'int32'
        },
        timeToReviveInSeconds: {
            type: 'integer',
            format: 'int32'
        },
        wizardHeight: {
            type: 'number',
            format: 'float'
        },
        wizardWidth: {
            type: 'number',
            format: 'float'
        },
        wizardSpeed: {
            type: 'number',
            format: 'float'
        },
        bulletDamage: {
            type: 'number',
            format: 'float'
        },
        bulletHeight: {
            type: 'number',
            format: 'float'
        },
        bulletWidth: {
            type: 'number',
            format: 'float'
        },
        bulletSpeed: {
            type: 'number',
            format: 'float'
        },
        lobbyWidth: {
            type: 'number',
            format: 'float'
        },
        lobbyHeight: {
            type: 'number',
            format: 'float'
        },
        startXMargin: {
            type: 'number',
            format: 'float'
        },
        startYMargin: {
            type: 'number',
            format: 'float'
        },
        gameLifeTimeInSeconds: {
            type: 'integer',
            format: 'int32'
        }
    },
    additionalProperties: false
} as const;

export const GameLobbySchema = {
    type: 'object',
    properties: {
        gameTickInMilliseconds: {
            type: 'integer',
            format: 'int32'
        },
        isGameStarted: {
            type: 'boolean',
            readOnly: true
        },
        id: {
            type: 'string',
            format: 'uuid'
        },
        creatorId: {
            type: 'string',
            format: 'uuid'
        },
        startTime: {
            type: 'string',
            format: 'date-time',
            nullable: true,
            readOnly: true
        },
        createTime: {
            type: 'string',
            format: 'date-time'
        },
        lobbyEndTime: {
            type: 'string',
            format: 'date-time'
        },
        wizards: {
            type: 'array',
            items: {
                '$ref': '#/components/schemas/Wizard'
            },
            nullable: true
        },
        bullets: {
            type: 'array',
            items: {
                '$ref': '#/components/schemas/Bullet'
            },
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

export const PointSchema = {
    type: 'object',
    properties: {
        x: {
            type: 'number',
            format: 'float'
        },
        y: {
            type: 'number',
            format: 'float'
        }
    },
    additionalProperties: false
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

export const WizardSchema = {
    type: 'object',
    properties: {
        position: {
            '$ref': '#/components/schemas/Point'
        },
        height: {
            type: 'number',
            format: 'float'
        },
        width: {
            type: 'number',
            format: 'float'
        },
        leftTop: {
            '$ref': '#/components/schemas/Point'
        },
        leftBottom: {
            '$ref': '#/components/schemas/Point'
        },
        rightTop: {
            '$ref': '#/components/schemas/Point'
        },
        rightBottom: {
            '$ref': '#/components/schemas/Point'
        },
        center: {
            '$ref': '#/components/schemas/Point'
        },
        id: {
            type: 'string',
            format: 'uuid'
        },
        profileId: {
            type: 'string',
            format: 'uuid'
        },
        name: {
            type: 'string',
            nullable: true
        },
        sideType: {
            '$ref': '#/components/schemas/SideType'
        },
        currentHitPoints: {
            type: 'number',
            format: 'float',
            readOnly: true
        },
        magicType: {
            '$ref': '#/components/schemas/MagicType'
        },
        timeToReviveInSeconds: {
            type: 'integer',
            format: 'int32'
        },
        spawnPosition: {
            '$ref': '#/components/schemas/Point'
        },
        eyeDirection: {
            '$ref': '#/components/schemas/Axis'
        },
        state: {
            '$ref': '#/components/schemas/WizardState'
        }
    },
    additionalProperties: false
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

export const WizardStateSchema = {
    enum: [0, 1, 2, 3, 4],
    type: 'integer',
    format: 'int32'
} as const;