package com.internship.auctionapp.util;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;

class RegexUtilsTest {
    @Test
    public void RegexUtils_runs_correctly_when_email_is_valid() {
        final boolean matchResult = RegexUtils.match(RegexUtils.VALID_EMAIL_ADDRESS_REGEX, "user@gmail.com");

        assertEquals(true, matchResult);
    }

    @Test
    public void RegexUtils_returns_false_when_email_is_null() {
        final boolean matchResult = RegexUtils.match(RegexUtils.VALID_EMAIL_ADDRESS_REGEX, null);

        assertEquals(false, matchResult);
    }

    @Test
    public void RegexUtils_returns_false_when_email_is_not_valid() {
        final boolean matchResult = RegexUtils.match(RegexUtils.VALID_EMAIL_ADDRESS_REGEX, "usergmail.com");

        assertEquals(false, matchResult);
    }

    @Test
    public void RegexUtils_returns_false_when_email_is_empty_string() {
        final boolean matchResult = RegexUtils.match(RegexUtils.VALID_EMAIL_ADDRESS_REGEX, "");

        assertEquals(false, matchResult);
    }

    @Test
    public void RegexUtils_runs_correctly_when_password_is_valid() {
        final boolean matchResult = RegexUtils.match(RegexUtils.VALID_PASSWORD_REGEX, "Pa$$w0rd");

        assertEquals(true, matchResult);
    }

    @Test
    public void RegexUtils_throws_exception_when_password_is_null() {
        final boolean matchResult = RegexUtils.match(RegexUtils.VALID_PASSWORD_REGEX, null);

        assertEquals(false, matchResult);
    }

    @Test
    public void RegexUtils_returns_fals_when_password_has_less_than_8_characters() {
        final boolean matchResult = RegexUtils.match(RegexUtils.VALID_PASSWORD_REGEX, "Pa$$w0");

        assertEquals(false, matchResult);
    }

    @Test
    public void RegexUtils_returns_false_when_password_is_without_number() {
        final boolean matchResult = RegexUtils.match(RegexUtils.VALID_PASSWORD_REGEX, "Pa$$word");

        assertEquals(false, matchResult);
    }

    @Test
    public void RegexUtils_returns_false_when_password_is_without_symbol() {
        final boolean matchResult = RegexUtils.match(RegexUtils.VALID_PASSWORD_REGEX, "Passw0rd");

        assertEquals(false, matchResult);
    }

    @Test
    public void RegexUtils_returns_false_when_password_is_without_lowercase_letter() {
        final boolean matchResult = RegexUtils.match(RegexUtils.VALID_PASSWORD_REGEX, "PA$$W0RD");

        assertEquals(false, matchResult);
    }

    @Test
    public void RegexUtils_returns_false_when_password_is_without_uppercase_letter() {
        final boolean matchResult = RegexUtils.match(RegexUtils.VALID_PASSWORD_REGEX, "pa$$w0rd");

        assertEquals(false, matchResult);
    }
}