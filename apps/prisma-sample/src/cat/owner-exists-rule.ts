import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { PrismaService } from '../prisma/prisma.service';

@ValidatorConstraint({ name: 'OwnerExistsRule', async: true })
export class OwnerExistsRule implements ValidatorConstraintInterface {
  constructor(private readonly prisma: PrismaService) {}

  async validate(ownerId: string) {
    const owner = await this.prisma.owner.findFirst({
      where: { id: ownerId },
    });

    if (owner) {
      return true;
    }

    return false;
  }
}
