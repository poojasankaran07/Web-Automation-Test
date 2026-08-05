class DataGenerator {
    generateRandomNumber(max: number = 100000): number {
        return Math.floor(Math.random() * max);
    }

    generateName(prefix: string = 'TestName'): string {
        return `${prefix}_${this.generateRandomNumber()}`;
    }

    generateLastName(prefix: string = 'TestLastName'): string {
        return `${prefix}_${this.generateRandomNumber()}`;
    }

    generateCompany(prefix: string = 'Company'): string {
        return `${prefix}_${this.generateRandomNumber()}`;
    }

    generateAddress(prefix: string = '123 Main Street'): string {
        return `${prefix} ${this.generateRandomNumber()}`;
    }

    generateAddress2(prefix: string = 'Near'): string {
        return `${prefix}_${this.generateRandomNumber()}`;
    }

    generateEmail(prefix: string = 'testemail', domain: string = 'yopmail.com'): string {
        const random = this.generateRandomNumber();
        return `${prefix}${random}@${domain}`;
    }

    generateSubject(prefix: string = 'Adding Subject'): string {
        return `${prefix} - ${this.generateRandomNumber()}`;
    }

    generateMessage(prefix: string = 'Adding a message to get in touch with the team'): string {
        return `${prefix} - ${this.generateRandomNumber()}`;
    }

    generateReviewText(prefix: string = 'Review Text Added'): string {
        return `${prefix} - ${this.generateRandomNumber()}`;
    }
}

export default new DataGenerator();
