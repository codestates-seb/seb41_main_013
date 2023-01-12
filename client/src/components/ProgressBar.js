import styled from "styled-components";
import LinearProgress from '@mui/material/LinearProgress';

const BorderLinearProgress = styled(LinearProgress)`
  && {
    height: 1rem;
    border-radius: 5rem;
    margin-top: 0.6rem;
  }
`;

export default function CustomizedProgressBars(props) {
  return (
    <>
      <BorderLinearProgress variant="determinate" value={props.percent} />
    </>
  );
}