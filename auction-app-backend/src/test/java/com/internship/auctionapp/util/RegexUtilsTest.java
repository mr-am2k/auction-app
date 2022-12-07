package com.internship.auctionapp.util;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.assertEquals;

class RegexUtilsTest {
    @Test
    public void RegexUtils_entered_email_is_valid(){
        final boolean validate = RegexUtils.validate(RegexUtils.VALID_EMAIL_ADDRESS_REGEX, "user@gmail.com");

        assertEquals(true, validate);
    }

    @Test
    public void RegexUtils_entered_email_is_null(){
        final NullPointerException thrown = Assertions.assertThrows(NullPointerException.class, () -> {
            RegexUtils.validate(RegexUtils.VALID_EMAIL_ADDRESS_REGEX, null);
        }, "NullPointerException was expected");

       assertEquals("Cannot invoke \"java.lang.CharSequence.length()\" because \"this.text\" is null", thrown.getMessage());
    }

    @Test
    public void RegexUtils_entered_email_is_not_valid(){
        final boolean validate = RegexUtils.validate(RegexUtils.VALID_EMAIL_ADDRESS_REGEX, "usergmail.com");

        assertEquals(false, validate);
    }

    @Test
    public void RegexUtils_entered_email_is_empty_string(){
        final boolean validate = RegexUtils.validate(RegexUtils.VALID_EMAIL_ADDRESS_REGEX, "");

        assertEquals(false, validate);
    }

    @Test
    public void RegexUtils_entered_password_is_valid(){
        final boolean validate = RegexUtils.validate(RegexUtils.VALID_PASSWORD_REGEX, "Pa$$w0rd");

        assertEquals(true, validate);
    }

    @Test
    public void RegexUtils_entered_password_is_null(){
        final NullPointerException thrown = Assertions.assertThrows(NullPointerException.class, () -> {
            RegexUtils.validate(RegexUtils.VALID_PASSWORD_REGEX, null);
        }, "NullPointerException was expected");

        assertEquals("Cannot invoke \"java.lang.CharSequence.length()\" because \"this.text\" is null", thrown.getMessage());
    }

    @Test
    public void RegexUtils_entered_password_has_less_than_eight_characters(){
        final boolean validate = RegexUtils.validate(RegexUtils.VALID_PASSWORD_REGEX, "Pa$$w0");

        assertEquals(false, validate);
    }

    @Test
    public void RegexUtils_entered_password_is_without_number(){
        final boolean validate = RegexUtils.validate(RegexUtils.VALID_PASSWORD_REGEX, "Pa$$word");

        assertEquals(false, validate);
    }

    @Test
    public void RegexUtils_entered_password_is_without_symbol(){
        final boolean validate = RegexUtils.validate(RegexUtils.VALID_PASSWORD_REGEX, "Passw0rd");

        assertEquals(false, validate);
    }

    @Test
    public void RegexUtils_entered_password_is_without_lowercase_letter(){
        final boolean validate = RegexUtils.validate(RegexUtils.VALID_PASSWORD_REGEX, "PA$$W0RD");

        assertEquals(false, validate);
    }

    @Test
    public void RegexUtils_entered_password_is_without_uppercase_letter(){
        final boolean validate = RegexUtils.validate(RegexUtils.VALID_PASSWORD_REGEX, "pa$$w0rd");

        assertEquals(false, validate);
    }
}