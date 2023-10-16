package com.example.demo.config;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import static com.example.demo.Entity.Permission.ADMIN_CREATE;
import static com.example.demo.Entity.Permission.ADMIN_DELETE;
import static com.example.demo.Entity.Permission.ADMIN_READ;
import static com.example.demo.Entity.Permission.ADMIN_UPDATE;
import static com.example.demo.Entity.Permission.MANAGER_CREATE;
import static com.example.demo.Entity.Permission.MANAGER_DELETE;
import static com.example.demo.Entity.Permission.MANAGER_READ;
import static com.example.demo.Entity.Permission.MANAGER_UPDATE;
import static com.example.demo.Entity.Role.ADMIN;
import static com.example.demo.Entity.Role.MANAGER;
import static org.springframework.http.HttpMethod.DELETE;
import static org.springframework.http.HttpMethod.GET;
import static org.springframework.http.HttpMethod.POST;
import static org.springframework.http.HttpMethod.PUT;

import java.util.Arrays;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;

import lombok.RequiredArgsConstructor;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfiguration {

	@Autowired
	private  JwtAuthenticationFilter jwtAuthFilter;
	@Autowired
	private  AuthenticationProvider authenticationProvider;
	
	@Autowired
	UserDetailsService userDetailsService;
	@Bean
	public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
		http
		.cors(cors -> cors.configurationSource(corsConfigurationSource()))
		.csrf(csrf -> csrf.disable())
		.authorizeHttpRequests()
		.requestMatchers("/api/auth/**").permitAll()
		.requestMatchers("/permitall/**").permitAll()
		.requestMatchers(GET,"/api/admin/**").permitAll()
		.requestMatchers("/api/management/**").hasAnyRole(ADMIN.name(),MANAGER.name())
		.requestMatchers("/image_user/**").permitAll()
		
		.requestMatchers(GET,"/api/management/**").hasAnyAuthority(ADMIN_READ.name(),MANAGER_READ.name())
		.requestMatchers(POST,"/api/management/**").hasAnyAuthority(ADMIN_CREATE.name(),MANAGER_CREATE.name())
		.requestMatchers(PUT,"/api/management/**").hasAnyAuthority(ADMIN_UPDATE.name(),MANAGER_UPDATE.name())
		.requestMatchers(DELETE,"/api/management/**").hasAnyAuthority(ADMIN_DELETE.name(),MANAGER_DELETE.name())

		.requestMatchers("/api/admin/**").hasRole(ADMIN.name())
		
		.requestMatchers(GET,"/api/admin/**").hasAuthority(ADMIN.name())
		.requestMatchers(POST,"/api/admin/**").hasAuthority(ADMIN_CREATE.name())
		.requestMatchers(PUT,"/api/admin/**").hasAuthority(ADMIN_UPDATE.name())
		.requestMatchers(DELETE,"/api/admin/**").hasAuthority(ADMIN_DELETE.name())
		.anyRequest()
		.authenticated()
		.and()
		.sessionManagement()
		.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
		.and()
		.authenticationProvider(authenticationProvider)
		.addFilterBefore(jwtAuthFilter,UsernamePasswordAuthenticationFilter.class);
		return http.build();
		
		
	}

	@Bean
	public CorsConfigurationSource corsConfigurationSource() {
		CorsConfiguration cors = new CorsConfiguration();
		cors.setAllowedHeaders(Arrays.asList("Authorization", "Content-Type"));
		cors.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE"));
		cors.setAllowCredentials(true);
		cors.setAllowedOrigins(Arrays.asList("http://localhost:3000","http://localhost:3001","http://localhost:3002"));
		UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
		source.registerCorsConfiguration("/**", cors);
		return source;
	}
}
