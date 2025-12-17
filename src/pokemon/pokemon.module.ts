import { Module } from '@nestjs/common';
import { PokemonService } from './pokemon.service';
import { PokemonController } from './pokemon.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Pokemon, PokemonSchema } from './entities/pokemon.entity';
import { ConfigModule } from '@nestjs/config';

@Module({
  controllers: [PokemonController],
  providers: [PokemonService],
  imports: [
    ConfigModule,
    MongooseModule.forFeature([
      {
        name: Pokemon.name, //nombre de la tabla
        schema: PokemonSchema, //Schema de la entidad
      }
    ])
  ],
  exports: [
    MongooseModule //Exportamos el modulo que tiene las configuraciones
  ]
})
export class PokemonModule {}
