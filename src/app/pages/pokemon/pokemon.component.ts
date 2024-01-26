import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Pokemon } from 'src/app/models/pokemon';
import { PokemonService } from 'src/app/shared/pokemon.service';
import { Response } from 'src/app/models/response';

@Component({
  selector: 'app-pokemon',
  templateUrl: './pokemon.component.html',
  styleUrls: ['./pokemon.component.css']
})
export class PokemonComponent implements OnInit {
  public pokemon: Pokemon;
  public id: number;
  public pokemonDetail: any;
  public parameter: string;

  constructor(
    public apiService: PokemonService,
    private router:Router,
    private route: ActivatedRoute
  ){
    this.pokemonDetail = {};
  }


  private getPokemonDetail(id:number){
    this.apiService.getOne(id).subscribe(pokemonData =>{
      this.pokemonDetail = pokemonData;
      //PokeAPIのレスポンスはdataプロパティを持たないため、レスポンスオブジェクトを直接使用する必要
    })
  }

  ngOnInit(): void {
    //RouterクラスにはqueryParamsプロパティがないため、代わりにActivatedRouteを使用してクエリパラメータを取得
    this.route.queryParams.subscribe(params => {
      let id = +params['id'];
      if(id){
        this.getPokemonDetail(id);
      }
    })
  }



}
