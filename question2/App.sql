SELECT user_code, SUM(tote_number)
  FROM order_tote_process_log
  WHERE action_code = "PICKED"
  AND TIME(process_date) >= TIME('10:00:00')
  AND TIME(process_date) <= TIME('10:59:59')
  GROUP BY user_code;
