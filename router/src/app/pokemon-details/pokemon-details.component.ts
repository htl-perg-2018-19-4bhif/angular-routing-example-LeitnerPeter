import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

interface IPokemonResult {
  name: string;
  abilities: any[];
}

class pokemondetail{
  name: string;
  abilities: string[];
}

@Component({
  selector: 'app-pokemon-details',
  templateUrl: './pokemon-details.component.html',
  styleUrls: ['./pokemon-details.component.css']
})
export class PokemonDetailsComponent implements OnInit {
  pokemonId = "";
  pokemonresult: IPokemonResult = { name: "", abilities: []};
  pokemondetail: pokemondetail = { name: "", abilities: []};

  constructor(private route: ActivatedRoute, private http: HttpClient) { 
    route.paramMap.subscribe(map => {
      this.pokemonId = map.get("id");
    });
    this.loadPokeDetails();
  }

  ngOnInit() {
  }

  async loadPokeDetails() {
    this.pokemonresult = await this.http.get<IPokemonResult>(`https://pokeapi.co/api/v2/pokemon/${this.pokemonId}`).toPromise();
    
    this.pokemondetail.name = this.pokemonresult.name;
    for (let i = 0; i < this.pokemonresult.abilities.length; i++){
      this.pokemondetail.abilities.push(this.pokemonresult.abilities[i].ability.name);
    }
  }

}
