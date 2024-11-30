import styled from "@emotion/styled";
import { Link } from "react-router-dom";
import { POKEMON_IMAGE_TYPE } from "../Constant";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../Store";
import { ChangeEvent } from "react";
import { changeImageType, PokemonImageKeyType } from "../Store/imageTypeSlice";
import { setSearchQuery } from "../Store/searchSlice";

const PageHeader = () => {
  const type = useSelector((state: RootState) => state.imageType.type);
  const dispatch = useAppDispatch();

  const handleChangeType = (e: ChangeEvent<HTMLSelectElement>) => {
    dispatch(
      changeImageType({
        type: e.target.value as PokemonImageKeyType,
      })
    );
  };

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchQuery(e.target.value));
  };

  return (
    <Header>
      <Title>
        <Link to="/">Pokémon</Link>
      </Title>
      <SearchInput
        type="text"
        placeholder="Search Pokémon"
        onChange={handleSearchChange}
      />
      <Select value={type} onChange={handleChangeType}>
        <option value={POKEMON_IMAGE_TYPE.OFFICIAL_ARTWORK}>Official</option>
        <option value={POKEMON_IMAGE_TYPE.DREAM_WORLD}>DreamWorld</option>
        <option value={POKEMON_IMAGE_TYPE.FRONT_DEFAULT}>FrontDefault</option>
      </Select>
    </Header>
  );
};

const Header = styled.nav`
  display: flex;
  padding: 16px 32px;
  margin-bottom: 16px;
  border-bottom: 1px solid #c0c0c0;
`;

const Title = styled.h1`
  margin: 0;
  font-size: 32px;
  color: #ffca09;
  text-shadow: 1px 0 blue, 0 2px blue, 1px 0 blue, 0 1px blue;
`;

const SearchInput = styled.input`
  margin: 0 16px;
  padding: 8px 12px;
  border: 1px solid #c0c0c0;
  border-radius: 8px;
`;

const Select = styled.select`
  margin-left: auto;
  padding: 8px 12px;
  border-radius: 8px;
`;

export default PageHeader;
