package com.progweb.flights;

import java.util.HashMap;
import java.util.Map;

public class DatabaseClass {
	private static Map<Long,Flight> flights = new HashMap<>();

	public static Map<Long, Flight> getFlights() {
		return flights;
	}	
	
}
