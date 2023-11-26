import { getRounds, hashSync } from 'bcryptjs';
import { Telefone } from './telefone.entity';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('usuario')
export class User {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'varchar', length: 80 })
  nome: string;

  @Column({ type: 'varchar', length: 50, unique: true })
  email: string;

  @Column({ type: 'text' })
  senha: string;

  @CreateDateColumn({ type: 'date' })
  data_criacao: Date | string;

  @UpdateDateColumn({ type: 'date' })
  data_atualizacao: Date | string;

  @Column({ type: 'date' })
  ultimo_login: Date | string;

  @Column({ type: 'text' })
  token: string;

  @OneToMany(() => Telefone, (telefone) => telefone)
  telefones: Telefone;

  @BeforeInsert()
  @BeforeUpdate()
  hashPassword() {
    const isEncrypted: number = getRounds(this.senha);

    if (!isEncrypted) {
      this.senha = hashSync(this.senha, 10);
    }
  }
}
