import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  fetchPokemonsAPI,
  PokemonListResponse,
} from "../Service/PokemonService";

export const fetchPokemons = createAsyncThunk(
  "pokemon/fetchPokemons",
  async (nextUrl?: string) => {
    const response = await fetchPokemonsAPI(nextUrl);
    return response;
  }
);

interface PokemonsState {
  pokemons: PokemonListResponse;
}

const initialState = {
  pokemons: {
    count: 0,
    next: "",
    results: [],
  },
} as PokemonsState;

const pokemonsSlice = createSlice({
  name: "pokemons",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      fetchPokemons.fulfilled,
      (state, action: PayloadAction<PokemonListResponse>) => {
        if (state.pokemons.results.length > 0) {
          state.pokemons = {
            ...action.payload,
            results: [...state.pokemons.results, ...action.payload.results],
          };
        } else {
          state.pokemons = action.payload;
        }
      }
    );
  },
});

export const pokemonsReducer = pokemonsSlice.reducer;
