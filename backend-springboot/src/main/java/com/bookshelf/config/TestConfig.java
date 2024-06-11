package com.bookshelf.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;

import com.bookshelf.services.DBService;

@Configuration
@Profile ("test")
public class TestConfig {

	@Autowired
	private DBService dbService;
	
	@Bean
	void instanceDB() {
		this.dbService.instanceDB();
	}
}
