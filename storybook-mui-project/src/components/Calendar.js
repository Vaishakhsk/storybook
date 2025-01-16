import React from 'react';
import dayjs from 'dayjs';
import { Box, Grid, IconButton, Paper, Typography } from '@mui/material';
import AdsClickIcon from '@mui/icons-material/AdsClick';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

const Calendar = ({ 
    monthsToShow = 12,
    year = new Date().getFullYear(),
    selectedHolidays = [],
    onDateSelect,
    direction = 'row',
    spacing = 2,
    wrap = true 
}) => {
    const [currentYear, setCurrentYear] = React.useState(year);

    React.useEffect(() => {
        setCurrentYear(year);
    }, [year]);

    const generateMonthCalendar = (year, month) => {
        const firstDayOfMonth = dayjs().year(year).month(month).date(1);
        const daysInMonth = firstDayOfMonth.daysInMonth();
        const startingDayOfWeek = firstDayOfMonth.day();
        const calendar = [];
        let currentWeek = new Array(7).fill(null);

        for (let i = 0; i < startingDayOfWeek; i++) {
            currentWeek[i] = null;
        }

        for (let day = 1; day <= daysInMonth; day++) {
            const currentDate = firstDayOfMonth.date(day);
            const weekDay = currentDate.day();
            currentWeek[weekDay] = currentDate;

            if (weekDay === 6 || day === daysInMonth) {
                calendar.push(currentWeek);
                currentWeek = new Array(7).fill(null);
            }
        }

        if (currentWeek.some((d) => d !== null)) {
            calendar.push(currentWeek);
        }

        return calendar;
    };

    const monthNames = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ].slice(0, monthsToShow);

    const isHoliday = (date) => {
        return selectedHolidays.some((holiday) =>
            dayjs(holiday.date).isSame(date, 'day')
        );
    };

    const handleDateClick = (day) => {
        if (onDateSelect) onDateSelect(day);
    };

    const isBeforeToday = (date) => {
        return date && date.isBefore(dayjs(), 'day');
    };

    const renderMonthCalendar = (year, month) => {
        const monthCalendar = generateMonthCalendar(year, month);

        return (
            <Paper
                elevation={3}
                sx={{
                    p: 1,
                    m: 0.5,
                    width: '100%',
                    maxWidth: 300,
                    height: 290,
                    overflow: 'auto',
                }}
            >
                <Typography
                    align="center"
                    sx={{
                        fontSize: '1.6rem',
                        mb: 1,
                        fontWeight: 'bold',
                        color: 'white',
                    }}
                >
                    {monthNames[month]} {year}
                </Typography>

                <Grid container columns={7} sx={{ mb: 0.5 }}>
                    {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(
                        (day) => (
                            <Grid
                                item
                                xs={1}
                                key={day}
                                sx={{
                                    textAlign: 'center',
                                    fontWeight: 'bold',
                                    color: '#f978b3',
                                }}
                            >
                                {day}
                            </Grid>
                        )
                    )}
                </Grid>

                {monthCalendar.map((week, weekIndex) => (
                    <Grid container columns={7} key={weekIndex} sx={{ mb: 2.1 }}>
                        {week.map((day, dayIndex) => (
                            <Grid
                                item
                                xs={1}
                                key={dayIndex}
                                sx={{
                                    textAlign: 'center',
                                    cursor: day
                                        ? isBeforeToday(day)
                                            ? 'default'
                                            : 'pointer'
                                        : 'default',
                                    bgcolor: day
                                        ? isHoliday(day)
                                            ? 'rgba(223, 43, 135, 0.3)'
                                            : day.isSame(dayjs(), 'day')
                                            ? 'primary.main'
                                            : isBeforeToday(day)
                                            ? 'rgba(255, 255, 255, 0.1)'
                                            : 'transparent'
                                        : 'transparent',
                                    color: day
                                        ? isBeforeToday(day)
                                            ? 'text.disabled'
                                            : day.isSame(dayjs(), 'day')
                                            ? 'primary.contrastText'
                                            : isHoliday(day)
                                            ? 'text.primary'
                                            : 'text.primary'
                                        : 'text.disabled',
                                    opacity: isBeforeToday(day) ? 0.5 : 1,
                                    borderRadius: 1,
                                    pointerEvents: isBeforeToday(day)
                                        ? 'none'
                                        : undefined,
                                    '&:hover': !isBeforeToday(day)
                                        ? { bgcolor: 'action.hover' }
                                        : {},
                                }}
                                onClick={() =>
                                    day &&
                                    !isBeforeToday(day) &&
                                    handleDateClick(day)
                                }
                            >
                                {day ? day.date() : ''}
                            </Grid>
                        ))}
                    </Grid>
                ))}
            </Paper>
        );
    };

    return (
        <Box sx={{ p: 2 }}>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    mb: 3,
                }}
            >
                <IconButton
                    disabled={currentYear <= year}
                    onClick={() => setCurrentYear(currentYear - 1)}
                >
                    <ChevronLeftIcon />
                </IconButton>
                <Typography sx={{ mx: 2, fontWeight: 'bold', fontSize: '2.5rem' }}>
                    {currentYear}
                </Typography>
                <IconButton
                    disabled={currentYear >= year}
                    onClick={() => setCurrentYear(currentYear + 1)}
                >
                    <ChevronRightIcon />
                </IconButton>
            </Box>
            <Typography sx={{ mb: 1, opacity: 0.5 }}>
                Click on Any Date to Select Holiday
                <AdsClickIcon sx={{ mb: -0.7, opacity: 0.5, ml: 1 }} />
            </Typography>

            <Grid
                container
                spacing={spacing}
                sx={{
                    width: '100%',
                    flexDirection: direction === 'column' ? 'column' : 'row',
                    flexWrap: wrap ? 'wrap' : 'nowrap',
                    overflowX: direction === 'row' && !wrap ? 'auto' : 'hidden',
                    overflowY: direction === 'column' && !wrap ? 'auto' : 'hidden',
                }}
            >
                {monthNames.map((_, monthIndex) => (
                    <Grid
                        item
                        xs={12}
                        sm={6}
                        md={4}
                        lg={3}
                        key={monthIndex}
                        sx={{ display: 'flex', justifyContent: 'center' }}
                    >
                        {renderMonthCalendar(currentYear, monthIndex)}
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default Calendar;