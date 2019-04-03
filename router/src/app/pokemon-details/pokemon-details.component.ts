import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

interface IPokemonDetail {
  name: string;
  abilities: any[];
  abilityList: string[];
}

@Component({
  selector: 'app-pokemon-details',
  templateUrl: './pokemon-details.component.html',
  styleUrls: ['./pokemon-details.component.css']
})
export class PokemonDetailsComponent implements OnInit {
  pokemonId = "";
  pokemondetail: IPokemonDetail = { name: "", abilities: [], abilityList: [] };

  constructor(private route: ActivatedRoute, private http: HttpClient) { 
    route.paramMap.subscribe(map => {
      this.pokemonId = map.get("id");
    });
    this.loadPokeDetails();
  }

  ngOnInit() {
  }

  async loadPokeDetails() {
    this.pokemondetail = await this.http.get<IPokemonDetail>(`https://pokeapi.co/api/v2/pokemon/${this.pokemonId}`).toPromise();
    
    this.pokemondetail.abilityList = [];
    for (let i = 0; i < this.pokemondetail.abilities.length; i++){
      this.pokemondetail.abilityList.push(this.pokemondetail.abilities[i].ability.name);
    }
  }

}
