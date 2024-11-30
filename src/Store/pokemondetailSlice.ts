import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  fetchPokemonDetailAPI,
  PokemonDetailType,
} from "../Service/PokemonService";
import { RootState } from ".";

export const fetchPokemonDetail = createAsyncThunk(
  "pokemon/fetchPokemonDetail",
  async (name: string) => {
    const response = await fetchPokemonDetailAPI(name);
    return response;
  },
  {
    condition: (name, { getState }) => {
      const { pokemonDetail } = getState() as RootState;
      const pokemon = pokemonDetail.pokemonDetails[name];

      return !pokemon;
    },
  }
);

interface PokemonDetailState {
  pokemonDetails: Record<string, PokemonDetailType>;
}

const initialState = {
  pokemonDetails: {},
} as PokemonDetailState;

const pokemonDetailSlice = createSlice({
  name: "pokemonDetail",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      fetchPokemonDetail.fulfilled,
      (state, action: PayloadAction<PokemonDetailType>) => {
        state.pokemonDetails = {
          ...state.pokemonDetails,
          [action.payload.name]: action.payload,
        };
      }
    );
  },
});

export const pokemonDetailReducer = pokemonDetailSlice.reducer;
