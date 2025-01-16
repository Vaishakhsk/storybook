
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Calendar from '../components/Calendar';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

export default {
  title: 'Calendar',
  component: Calendar,
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    (Story) => (
      <ThemeProvider theme={darkTheme}>
        <Story />
      </ThemeProvider>
    ),
  ],
  argTypes: {
    monthsToShow: { type: 'number', defaultValue: 12 },
    year: { type: 'number', defaultValue: new Date().getFullYear() },
    direction: {
      control: { type: 'select' },
      options: ['row', 'column'],
    },
    spacing: {
      control: { type: 'number' },
      defaultValue: 2,
    },
    wrap: { type: 'boolean', defaultValue: true },
  },
};

const Template = ({ ...args }) => (
  <Calendar {...args} />
);

export const Horizontal = Template.bind({});
Horizontal.args = {
  direction: 'row',
  monthsToShow: 12,
  spacing: 2,
  wrap: true,
  selectedHolidays: [
    { date: new Date(new Date().getFullYear(), 0, 1) },
    { date: new Date(new Date().getFullYear(), 11, 25) }
  ]
};

export const Vertical = Template.bind({});
Vertical.args = {
  direction: 'column',
  monthsToShow: 12,
  spacing: 2,
  wrap: false,
  selectedHolidays: [
    { date: new Date(new Date().getFullYear(), 0, 1) },
    { date: new Date(new Date().getFullYear(), 11, 25) }
  ]
};

export const QuarterView = Template.bind({});
QuarterView.args = {
  direction: 'row',
  monthsToShow: 3,
  spacing: 2,
  wrap: false,
  selectedHolidays: [
    { date: new Date(new Date().getFullYear(), 0, 1) }
  ]
};

export const NoSpacing = Template.bind({});
NoSpacing.args = {
  direction: 'row',
  monthsToShow: 12,
  spacing: 0,
  wrap: true,
  selectedHolidays: []
};

export const SingleMonth = Template.bind({});
SingleMonth.args = {
  direction: 'row',
  monthsToShow: 1,
  spacing: 2,
  wrap: false,
  selectedHolidays: []
};

export const CustomYear = Template.bind({});
CustomYear.args = {
  year: 2025,
  direction: 'row',
  monthsToShow: 12,
  spacing: 2,
  wrap: true,
  selectedHolidays: [
    { date: new Date(2025, 0, 1) },
    { date: new Date(2025, 11, 25) }
  ]
};