package com.bookshelf.domain.enums;

public enum StatusReading {
	READ(0, "STATUS_READ"), READING(1, "STATUS_READING"), WANTTOREAD(2, "STATUS_WANTTOREAD");

	private Integer code;
	private String description;
	
	private StatusReading(Integer code, String description) {
		this.code = code;
		this.description = description;
	}

	public Integer getCode() {
		return code;
	}

	public String getDescription() {
		return description;
	}
	
	public static StatusReading toEnum(Integer code) {
		if ( code == null ) {
			return null;
		}
		
		for ( StatusReading value : StatusReading.values()) {
			if (code.equals(value.getCode())) {
				return value;
			}
		}
		
		throw new IllegalArgumentException("Invalid status.");
	}
}
