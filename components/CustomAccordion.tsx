import * as React from 'react';
import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion, { AccordionProps } from '@mui/material/Accordion';
import MuiAccordionSummary, {
  AccordionSummaryProps,
} from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';

const Accordion = styled((props: AccordionProps) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid rgba(255,255,255,0.3)`,
  '&:not(:last-child)': {
    borderBottom: 0,
  },
  '&:before': {
    display: 'none',
  },
  backgroundColor: 'none'
}));

const AccordionSummary = styled((props: AccordionSummaryProps) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem', filter: 'invert(1)' }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    'rgba(255, 255, 255, .05)',
  flexDirection: 'row-reverse',
  '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
    transform: 'rotate(90deg)',
  },
  '& .MuiAccordionSummary-content': {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
    display: 'flex',
    flexWrap: 'wrap',
    borderTop: '1px solid rgba(0, 0, 0, .125)',
}));

interface IProps {
    title: string,
    expanded: boolean,
    handleChange: (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => any,
    id: string,
    children: any
}

const CustomAccordion = ({title, expanded, handleChange, id, children}:IProps) => {
  return (
    <Accordion expanded={expanded} onChange={handleChange(id)} style={{backgroundColor: 'black', color: 'white'}}>
    <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
        <Typography>{title}</Typography>
    </AccordionSummary>
    <AccordionDetails>
        {children}
    </AccordionDetails>
    </Accordion>
  );
}

export default CustomAccordion