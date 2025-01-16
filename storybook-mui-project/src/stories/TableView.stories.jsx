
import { ThemeProvider, createTheme } from '@mui/material/styles';
import TableView from '../components/TableView';

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
    },
});

export default {
    title: 'Components/TableView',
    component: TableView,
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
        numberOfHolidays: { type: 'number', defaultValue: 4 }
    }
};

// Helper function to generate sample holidays
const generateSampleHolidays = (count) => {
    const holidays = [];
    const holidayNames = [
        'New Year\'s Day',
        'Independence Day',
        'Labor Day',
        'Christmas Day',
        'Thanksgiving',
        'Memorial Day',
        'Veterans Day',
        'Columbus Day'
    ];

    for (let i = 0; i < count; i++) {
        const date = new Date(2024, i, 1); // Spreading holidays across months
        holidays.push({
            date: date.toISOString().split('T')[0],
            name: holidayNames[i % holidayNames.length]
        });
    }
    return holidays;
};

const Template = ({ numberOfHolidays, ...args }) => (
    <TableView
        {...args}
        holidays={generateSampleHolidays(numberOfHolidays)}
    />
);

export const Empty = Template.bind({});
Empty.args = {
    numberOfHolidays: 0
};

export const WithFewHolidays = Template.bind({});
WithFewHolidays.args = {
    numberOfHolidays: 3
};

export const WithManyHolidays = Template.bind({});
WithManyHolidays.args = {
    numberOfHolidays: 8
};

export const CustomHolidays = Template.bind({});
CustomHolidays.args = {
    holidays: [
        {
            date: '2024-01-01',
            name: 'New Year\'s Day'
        },
        {
            date: '2024-12-25',
            name: 'Christmas'
        },
        {
            date: '2024-07-04',
            name: 'Independence Day'
        }
    ]
};