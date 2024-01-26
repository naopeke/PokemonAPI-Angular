import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Pokemon } from 'src/app/models/pokemon';
import { PokemonService } from 'src/app/shared/pokemon.service';
import { Response } from 'src/app/models/response';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public pokemon: Pokemon;
  public id: number;
  public pokemonDetail: any;
  public parameter: string;

  constructor(
    public apiService: PokemonService,
    private router:Router,
    private activateRoute: ActivatedRoute
  ){
    this.parameter = this.activateRoute.snapshot.params.id;
    this.apiService.pokemon = null;
  }


  displayPokemon(searchInput: string):void{
    const pokemonId = parseInt(searchInput, 10);
    if(pokemonId){
      this.apiService.getOne(pokemonId).subscribe({
        next: (pokemonData: any) =>{
          // PokeApiのレスポンスデータを直接使用
          this.pokemonDetail = pokemonData;
          this.router.navigate(['/pokemon'], { queryParams: { id: pokemonId } });
        },
        error: error => {
          console.error('Error:', error);
        }
      });
    }}


  ngOnInit(): void {
  }

}
