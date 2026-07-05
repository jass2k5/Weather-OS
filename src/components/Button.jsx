import { useOsStore } from "../store/useOsStore";
import styled from 'styled-components';

export const Button = () => {
  const openApp = useOsStore((state) => state.openApp)
const Appid = "terminalMap"
const apps = useOsStore((state) => state.apps);
  return (
    <button className="btn-12 absolute top-[20%] right-[4%] z-50">
      <span>Button</span>
    </button>
  );
};