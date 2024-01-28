import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Pokemon } from 'src/app/models/pokemon';
import { PokemonService } from 'src/app/shared/pokemon.service';
import { Response } from 'src/app/models/response';
import { TYPE_IDS } from 'src/app/models/constants';
import { SharedPokemonService } from 'src/app/shared/shared-pokemon.service';


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
  public searchType: 'id' | 'name' | 'type';
  public searchQuery: number | string;
  public pokemonList: any[] = [];
  public pokemonDetailsList: any[] = [];

  constructor(
    public apiService: PokemonService,
    private router:Router,
    private route: ActivatedRoute,
    private sharedPokemonService: SharedPokemonService,
  ){
    this.pokemonDetail = {};
    
  }


  // PokemonComponent の役割

  //   SharedPokemonService から検索結果を受け取り、pokemonDetail に格納します。
  //   getPokemonDetail は使用されていないため、不要です。
  //   ngOnInit 内で SharedPokemonService の currentPokemonDetail を購読し、受け取ったデータを pokemonDetail に割り当てます。

  navigateToPokemonDetail(pokemonId: number): void {
    this.router.navigate(['/pokemon', pokemonId]);
  }
  
  ngOnInit(): void {
    this.sharedPokemonService.currentPokemonDetail.subscribe(pokemonDetail => {
      this.pokemonDetail = pokemonDetail;
    });
    this.sharedPokemonService.currentPokemonList.subscribe(list => {
      this.pokemonDetailsList = list;
    });
  }
  



}
