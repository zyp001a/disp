package com.^^=cop$$.^^=name.toLowerCase()$$.gen.dep;

import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.Locale;

public class DateUtils {
	public static String getAbsoluteString(Date date) {
		SimpleDateFormat format = new SimpleDateFormat("MM月dd日HH时",
																									 Locale.getDefault());
		String dateStr = format.format(date);
		return dateStr;// 10月03日 23时
	}

	public static String getString(Date date) {
		String dateStr;
		long min = (new Date().getTime() - date.getTime()) / 1000 / 60;
		if (min == 0) {
			dateStr = "刚才";
		} else if (min < 60) {
			dateStr = min + "分钟前";
		} else if (min < 60 * 24) {
			dateStr = min / 60 + "小时前";
		} else if (min < 60 * 24 * 2) {
			dateStr = "昨天";
		} else {
			dateStr = getAbsoluteString(date);
		}
		return dateStr;
	}

	public static boolean isExpired(Date date) {
		return date == null || date.before(new Date());
	}



	public static Date parseDate(String dateString) {
		SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd",
																									 Locale.getDefault());
		Date date = null;
		try {
			date = format.parse(dateString);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return date;
	}
	public static Date getNow(){
		return new Date(System.currentTimeMillis());
	}
	public static String getNowDateString() {
		SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd HH:mm",Locale.getDefault());
		String date = format.format(new Date(System.currentTimeMillis()));
		return date;// 2012-10-03 23:41
	}


	// 将传入时间与当前时间进行对比，是否今天昨天
	public static String getTime(Date date) {
		String todySDF = "HH:mm";
		String yesterDaySDF = "昨天 HH:mm";
		String otherSDF = "M月d日 HH:mm";
		SimpleDateFormat sfd = null;
		String time = "";
		Calendar dateCalendar = Calendar.getInstance();
		dateCalendar.setTime(date);
		Date now = new Date();
		Calendar targetCalendar = Calendar.getInstance();
		targetCalendar.setTime(now);
		targetCalendar.set(Calendar.HOUR_OF_DAY, 0);
		targetCalendar.set(Calendar.MINUTE, 0);
		if (dateCalendar.after(targetCalendar)) {
			sfd = new SimpleDateFormat(todySDF,Locale.getDefault());
			time = sfd.format(date);
			return time;
		} else {
			targetCalendar.add(Calendar.DATE, -1);
			if (dateCalendar.after(targetCalendar)) {
				sfd = new SimpleDateFormat(yesterDaySDF,Locale.getDefault());
				time = sfd.format(date);
				return time;
			}
		}
		sfd = new SimpleDateFormat(otherSDF,Locale.getDefault());
		time = sfd.format(date);
		return time;
	}

}
