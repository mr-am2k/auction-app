package com.internship.auctionapp.util;

import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;

public class DateUtils {
    public static LocalDateTime currentDateTime = LocalDateTime.now();

    //#TODO improve this in the future
    public static String calculateDateDiffVerbose(LocalDateTime expirationDateTime) {

        long dateDiffInDays = ChronoUnit.DAYS.between(currentDateTime, expirationDateTime);
        long dateDiffInHours = ChronoUnit.HOURS.between(currentDateTime, expirationDateTime);
        long dateDiffInMinutes = ChronoUnit.MINUTES.between(currentDateTime, expirationDateTime);
        long dateDiffInSeconds = ChronoUnit.SECONDS.between(currentDateTime, expirationDateTime);

        //return years
        if (dateDiffInDays > 364) {
            long yearsDiff = ChronoUnit.YEARS.between(currentDateTime, expirationDateTime);
            return yearsDiff == 1 ? yearsDiff + " year" : yearsDiff + " years";
        }

        //return months
        if (dateDiffInDays >= 30) {
            long monthsDiff = ChronoUnit.MONTHS.between(currentDateTime, expirationDateTime);
            return monthsDiff == 1 ? monthsDiff + " month" : monthsDiff + " months";
        }

        //return weeks + days
        if (dateDiffInDays > 7) {
            long weeksDiff = ChronoUnit.WEEKS.between(currentDateTime, expirationDateTime);
            long numberOfDays = dateDiffInDays % 7;
            return weeksDiff == 1 ? weeksDiff + " week " +
                    numberOfDays + (numberOfDays == 1 ? " day" : " days") :
                    weeksDiff + " weeks " + numberOfDays + (numberOfDays == 1 ? " day" : " days");
        }

        //return days
        if (dateDiffInDays >= 1) {
            return dateDiffInDays == 1 ? dateDiffInDays + " day" : dateDiffInDays + " days";
        }

        //return hours + minutes
        if (dateDiffInHours >= 1) {
            long remainingMinutes = dateDiffInMinutes % 60;
            return dateDiffInHours == 1 ? dateDiffInHours + " hour " +
                    remainingMinutes + (remainingMinutes == 1 ? " minute" : " minutes") :
                    dateDiffInHours + " hours " + remainingMinutes + (remainingMinutes == 1 ? " minute" : " minutes");
        }

        //return minutes + seconds
        if (dateDiffInMinutes >= 1) {
            long remainingSeconds = dateDiffInSeconds % 60;
            return dateDiffInMinutes == 1 ? dateDiffInMinutes + " minute " +
                    remainingSeconds + (remainingSeconds == 1 ? " second" : " seconds") :
                    dateDiffInMinutes + " minutes " + remainingSeconds + (remainingSeconds == 1 ? " second" : " seconds");
        }

        //return seconds
        if (dateDiffInSeconds >= 1) {
            return dateDiffInSeconds == 1 ? dateDiffInSeconds + " second" : dateDiffInSeconds + " seconds";
        }

        return "-1";
    }

    public static boolean isInPast(LocalDateTime dateTime){
        return dateTime.isBefore(currentDateTime);
    }
}
