package com.bookshelf.domain;

import java.util.Objects;
import java.util.Set;
import java.util.HashSet;
import java.util.stream.Collectors;
import java.io.Serializable;

import jakarta.persistence.CollectionTable;
import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.validation.constraints.NotNull;

import com.bookshelf.domain.enums.*;

@Entity
public class Book implements Serializable {
	private static final long serialVersionUID = 1L;
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	protected Integer id;
	@NotNull(message = "The title field is required")
	protected String title;
	protected String author;
    private int publicationYear;
    private String language;
    private int pages;
    private String genre;
    @Column(name = "cover_image_url", columnDefinition = "LONGTEXT")
    private String coverImageUrl;
    
    @Enumerated(EnumType.STRING)
    @Column(name = "reading_status")
    private StatusReading readingStatus;
    
    @Enumerated(EnumType.STRING)
    @Column(name = "format")
    private Format format;
	
	public Book() {
		super();
	}
	
	public Book(int id, String title, String author, String publisher, String genre, int publicationYear, int pages, String language, String summary, String coverImageUrl, StatusReading readingStatus, Format format) {
        super();
		this.id = id;
        this.title = title;
        this.author = author;
        this.genre = genre;
        this.publicationYear = publicationYear;
        this.pages = pages;
        this.language = language;
        this.coverImageUrl = coverImageUrl;
        this.readingStatus = readingStatus;
        this.format = format;
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getAuthor() {
		return author;
	}

	public void setAuthor(String author) {
		this.author = author;
	}

	public StatusReading getReadingStatus() {
        return readingStatus;
    }

    public void setReadingStatus(StatusReading readingStatus) {
        this.readingStatus = readingStatus;
    }

    public Format getFormat() {
        return format;
    }

    public void setFormat(Format format) {
        this.format = format;
    }
	
	public int getPublicationYear() {
		return publicationYear;
	}

	public void setPublicationYear(int publicationYear) {
		this.publicationYear = publicationYear;
	}

	public String getLanguage() {
		return language;
	}

	public void setLanguage(String language) {
		this.language = language;
	}

	public int getPages() {
		return pages;
	}

	public void setPages(int pages) {
		this.pages = pages;
	}

	public String getGenre() {
		return genre;
	}

	public void setGenre(String genre) {
		this.genre = genre;
	}

	public String getCoverImageUrl() {
		return coverImageUrl;
	}

	public void setCoverImageUrl(String coverImageUrl) {
		this.coverImageUrl = coverImageUrl;
	}

	public static long getSerialversionuid() {
		return serialVersionUID;
	}

	@Override
	public int hashCode() {
		return Objects.hash(id);
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Book other = (Book) obj;
		return Objects.equals(id, other.id);
	}
	
}