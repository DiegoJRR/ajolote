export const descriptiveSignalType = (type: string) => {
    switch (type) {
        case 'bpm':
            return 'Latidos por minuto';
    }

    return type;
};
