import styled from 'styled-components';

export const ProgressBar = (props) => {
  return (
    <ProgressContainer>
      <ProgressBarOuter>
        <ProgressBarInner progress={props.progress} />
      </ProgressBarOuter>
      <ProgressLabel>{props.label}%</ProgressLabel>
    </ProgressContainer>
  );
};

const ProgressContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 0.6rem 0;
`;

const ProgressBarOuter = styled.div`
  flex: 1;
  height: 1rem;
  border-radius: 5rem;
  background-color: #eeeeee;
`;

const ProgressBarInner = styled.div`
  width: ${props => props.progress}%;
  height: 100%;
  border-radius: 5rem;
  background-color: #007fff;
`;

const ProgressLabel = styled.div`
  margin-left: 1rem;
`;