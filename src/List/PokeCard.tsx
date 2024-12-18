import styled from "@emotion/styled";
import PokeNameChip from "../components/PokeNameChip";
import PokeMarkChip from "../components/PokeMarkChip";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { PokeImageSkeleton } from "../components/PokeImageSkeleton";
import { useIntersectionObserver } from "react-intersection-observer-hook";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../Store";
import { fetchPokemonDetail } from "../Store/pokemondetailSlice";

interface PokeCardProps {
  name: string;
}

const PokeCard = (props: PokeCardProps) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const imageType = useSelector((state: RootState) => state.imageType.type);
  const { pokemonDetails } = useSelector(
    (state: RootState) => state.pokemonDetail
  );
  const [ref, { entry }] = useIntersectionObserver();
  const isVisble = entry && entry.isIntersecting;
  const pokemon = pokemonDetails[props.name];

  const handleClick = () => {
    navigate(`/pokemon/${props.name}`);
  };

  useEffect(() => {
    if (isVisble && !pokemon) {
      dispatch(fetchPokemonDetail(props.name));
    }
  }, [dispatch, props.name, isVisble, pokemon]);

  if (!pokemon) {
    return (
      <Item ref={ref} color={"#fff"}>
        <Header>
          <PokeNameChip name={"포켓몬"} color={"#ffca09"} id={0} />
        </Header>
        <Body>
          <PokeImageSkeleton />
        </Body>
        <Footer>
          <PokeMarkChip />
        </Footer>
      </Item>
    );
  }

  return (
    <Item onClick={handleClick} color={pokemon.color} ref={ref} tabIndex={0}>
      <Header>
        <PokeNameChip
          name={pokemon.koreanName}
          id={pokemon.id}
          color={pokemon.color}
        />
      </Header>
      <Body>
        <Image src={pokemon.images[imageType]} alt={pokemon.name} />
      </Body>
      <Footer>
        <PokeMarkChip />
      </Footer>
    </Item>
  );
};

const Item = styled.li<{ color: string }>`
  display: flex;
  flex-direction: column;

  padding: 8px;

  border: 1px solid #c0c0c0;
  box-shadow: 1px 1px 3px 1px #c0c0c0;

  width: 250px;
  height: 300px;

  cursor: pointer;
  transiton: transform 0.3s ease-in-out;

  &:hover {
    transform: scale(1.1);
  }
`;

const Header = styled.section`
  display: flex;
  flex-direction: row;
  margin: 8px 0;
`;

const Body = styled.section`
  display: flex;
  flex: 1 1 auto;
  justify-content: center;
  align-items: center;
  margin: 8px 0;
`;

const Image = styled.img`
  width: 180px;
  height: 180px;
`;

const Footer = styled.section`
  display: flex;
  flex-direction: row;
  margin: 8px 0;
`;

export default PokeCard;
