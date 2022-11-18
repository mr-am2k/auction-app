package com.internship.auctionapp.util;

import org.junit.jupiter.api.Test;

import java.time.LocalDateTime;

import static org.junit.jupiter.api.Assertions.*;

class DateUtilsTest {
    @Test
    public void DateUtil_date_difference_in_years_ok() {
        LocalDateTime currentDateTime = LocalDateTime.of(2022, 11, 17, 12, 12, 12);
        LocalDateTime newDateTime = LocalDateTime.of(2024, 12, 12, 12, 12, 12);
        assertEquals("2 years", DateUtils.calculateDateDiffVerbose(currentDateTime, newDateTime));
    }

    @Test
    public void DateUtil_date_difference_in_months_ok() {
        LocalDateTime currentDateTime = LocalDateTime.of(2022, 11, 17, 12, 12, 12);
        LocalDateTime newDateTime = LocalDateTime.of(2023, 9, 15, 12, 12, 12);
        assertEquals("9 months", DateUtils.calculateDateDiffVerbose(currentDateTime, newDateTime));
    }

    @Test
    public void DateUtil_date_difference_in_weeks_and_days_ok() {
        LocalDateTime currentDateTime = LocalDateTime.of(2022, 11, 17, 12, 12, 12);
        LocalDateTime newDateTime = LocalDateTime.of(2022, 12, 13, 12, 12, 12);
        assertEquals("3 weeks 5 days", DateUtils.calculateDateDiffVerbose(currentDateTime, newDateTime));
    }

    @Test
    public void DateUtil_date_difference_in_days_ok() {
        LocalDateTime currentDateTime = LocalDateTime.of(2022, 11, 17, 12, 12, 12);
        LocalDateTime newDateTime = LocalDateTime.of(2022, 11, 22, 12, 12, 12);
        assertEquals("5 days", DateUtils.calculateDateDiffVerbose(currentDateTime, newDateTime));
    }

    @Test
    public void DateUtil_date_difference_in_hours_and_minutes_ok() {
        LocalDateTime currentDateTime = LocalDateTime.of(2022, 11, 17, 12, 12, 12);
        LocalDateTime newDateTime = LocalDateTime.of(2022, 11, 17, 14, 8, 12);
        assertEquals("1 hour 56 minutes", DateUtils.calculateDateDiffVerbose(currentDateTime, newDateTime));
    }

    @Test
    public void DateUtil_date_difference_in_minutes_and_seconds_ok() {
        LocalDateTime currentDateTime = LocalDateTime.of(2022, 11, 17, 12, 12, 12);
        LocalDateTime newDateTime = LocalDateTime.of(2022, 11, 17, 12, 25, 10);
        assertEquals("12 minutes 58 seconds", DateUtils.calculateDateDiffVerbose(currentDateTime, newDateTime));
    }

    @Test
    public void DateUtil_date_difference_in_seconds_ok() {
        LocalDateTime currentDateTime = LocalDateTime.of(2022, 11, 17, 12, 12, 12);
        LocalDateTime newDateTime = LocalDateTime.of(2022, 11, 17, 12, 12, 22);
        assertEquals("10 seconds", DateUtils.calculateDateDiffVerbose(currentDateTime, newDateTime));
    }

    @Test
    public void DateUtil_date_is_before() {
        LocalDateTime currentDateTime = LocalDateTime.of(2022, 11, 17, 12, 12, 12);
        LocalDateTime newDateTime = LocalDateTime.of(2022, 11, 17, 12, 12, 2);
        assertEquals(true, DateUtils.isInPast(currentDateTime, newDateTime));
    }

    @Test
    public void DateUtil_date_is_after() {
        LocalDateTime currentDateTime = LocalDateTime.of(2022, 11, 17, 12, 12, 12);
        LocalDateTime newDateTime = LocalDateTime.of(2022, 11, 17, 12, 12, 22);
        assertEquals(false, DateUtils.isInPast(currentDateTime, newDateTime));
    }
}