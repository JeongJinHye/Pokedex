import styled from "@emotion/styled";
import PokeCard from "./PokeCard";
import { useEffect } from "react";
import useInfiniteScroll from "react-infinite-scroll-hook";
import { RootState, useAppDispatch } from "../Store";
import { useSelector } from "react-redux";
import { fetchPokemons } from "../Store/pokemonSlice";
import { fetchPokemonDetail } from "../Store/pokemondetailSlice";

const PokeCardList = () => {
  const dispatch = useAppDispatch();
  const { pokemons } = useSelector((state: RootState) => state.pokemons);
  const searchQuery = useSelector((state: RootState) => state.search.query);
  const { pokemonDetails } = useSelector(
    (state: RootState) => state.pokemonDetail
  );

  const filteredPokemons = pokemons.results.filter((pokemon) => {
    const detailedPokemon = pokemonDetails[pokemon.name];

    return (
      pokemon.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (detailedPokemon?.koreanName || "")
        .toLowerCase()
        .includes(searchQuery.toLowerCase())
    );
  });

  useEffect(() => {
    if (searchQuery) {
      pokemons.results.forEach((pokemon) => {
        if (!pokemonDetails[pokemon.name]) {
          dispatch(fetchPokemonDetail(pokemon.name));
        }
      });
    }
  }, [searchQuery, pokemons.results, pokemonDetails, dispatch]);

  const [infiniteRef] = useInfiniteScroll({
    loading: false,
    hasNextPage: pokemons.next !== "" && searchQuery === "",
    onLoadMore: () => {
      if (pokemons.next) {
        dispatch(fetchPokemons(pokemons.next));
      }
    },
    disabled: searchQuery !== "",
    rootMargin: "0px 0px 400px 0px",
  });

  useEffect(() => {
    dispatch(fetchPokemons());
  }, [dispatch]);

  return (
    <>
      <List>
        {filteredPokemons.map((pokemon, index) => {
          return (
            <PokeCard key={`${pokemon.name}_${index}`} name={pokemon.name} />
          );
        })}
      </List>
      {!searchQuery && <Loading ref={infiniteRef}>Loading...</Loading>}
      {searchQuery && filteredPokemons.length === 0 && (
        <NoResult>No Pokemon found</NoResult>
      )}
    </>
  );
};

const Loading = styled.div`
  display: flex;
  justify-content: center;
  margin: 16px 0;
`;

const NoResult = styled.div`
  display: flex;
  justify-content: center;
  color: #888;
  font-size: 20px;
  margin: 16px 0;
`;

const List = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0 0 32px 0;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
`;

export default PokeCardList;
