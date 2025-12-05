import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { isValidObjectId, Model } from 'mongoose';
import { Pokemon } from './entities/pokemon.entity';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class PokemonService {

  constructor(
    @InjectModel( Pokemon.name ) //Inyectamos el modelo para la Base de Datos
    private readonly pokemonModel: Model<Pokemon>
  ){}

  async create(createPokemonDto: CreatePokemonDto) {
    createPokemonDto.name = createPokemonDto.name.toLocaleLowerCase();

    try {
      const pokemon = await this.pokemonModel.create( createPokemonDto );
      return pokemon;

    } catch (error) {
      this.handleException( error );
    }
  }

  findAll() {
    return `This action returns all pokemon`;
  }

  async findOne(term: string) {
    
    let pokemon: Pokemon | null = null; //Variable que es de tipo Pokemon (Entity)

    //Verificamos si el ID es número
    if(!isNaN(+term)){
      pokemon = await this.pokemonModel.findOne( {no: term} );
    }

    //MongoID
    if(!pokemon && isValidObjectId(term)){ // "isValidObjectId" es un metodo de Mongoose para busvcar por el MongoID
      pokemon = await this.pokemonModel.findById(term);
    }

    //Name
    if(!pokemon){
      pokemon = await this.pokemonModel.findOne( { name: term.toLocaleLowerCase().trim()});
    }

    if(!pokemon) throw new NotFoundException(`El Pokemon con el id, nombre o no ${term} no existe`)
    return pokemon;
  }

  async update(term: string, updatePokemonDto: UpdatePokemonDto) {
    
    const pokemon = await this.findOne( term );

    if( updatePokemonDto.name ){
      updatePokemonDto.name = updatePokemonDto.name.toLocaleLowerCase();
    }

    try {
      await pokemon.updateOne( updatePokemonDto );
      return { ...pokemon.toJSON(), ...updatePokemonDto };
    } catch (error) {
      this.handleException( error );
    }

  }

  async remove(id: string) {
    // const pokemon = await this.findOne(id);
    // await pokemon.deleteOne();
    // return { id }
    // const result = await this.pokemonModel.findByIdAndDelete(id);
    const { deletedCount } = await this.pokemonModel.deleteOne({ _id: id });
    if(deletedCount === 0){
      throw new BadRequestException(`El Pokemon con el id ${id} no se encontro`)
    }

    return;
  }

  private handleException( error: any){
    if( error.code === 11000 ){
        throw new BadRequestException(`El Pokemon ${JSON.stringify( error.keyValue )} ya existe`)
      }
      console.log(error)
      throw new InternalServerErrorException(`No se pudo crear el Pokemon`)
  }
}
