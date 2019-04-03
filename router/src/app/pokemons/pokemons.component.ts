import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

class Pokemon {
  name: string;
  url: string;
  id: number;
}

interface IPokemons{
  results: Pokemon[];
}


@Component({
  selector: 'app-pokemons',
  templateUrl: './pokemons.component.html',
  styleUrls: ['./pokemons.component.css']
})
export class PokemonsComponent implements OnInit {
  pokemons: IPokemons;

  constructor(private http: HttpClient) { this.loadPokemon() }

  ngOnInit() {
  }

  async loadPokemon() {
    this.pokemons = await this.http.get<IPokemons>("https://pokeapi.co/api/v2/pokemon?limit=7000000000").toPromise();

    
  }

}
