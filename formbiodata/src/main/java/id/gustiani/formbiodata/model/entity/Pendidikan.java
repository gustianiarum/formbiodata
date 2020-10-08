package id.gustiani.formbiodata.model.entity;

import javax.persistence.*;

@Entity
@Table(name = "t_pendidikan")
public class Pendidikan {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id_pendidikan")
	private Integer idPendidikan;

	@ManyToOne
	@JoinColumn(name = "idperson", nullable = false)
	private Person person;
	
	@Column(name = "jenjang", length = 10, nullable = false)
	private String jenjang;
	
	@Column(name = "institusi", length = 50, nullable = false)
	private String institusi;
	
	@Column(name = "tahunmasuk", length = 10, nullable = false)
	private String thMasuk;
	
	@Column(name = "tahunlulus", length = 10, nullable = false)
	private String thLulus;

	public Integer getIdPendidikan() {
		return idPendidikan;
	}

	public void setIdPendidikan(Integer idPendidikan) {
		this.idPendidikan = idPendidikan;
	}

	public Person getPerson() {
		return person;
	}

	public void setPerson(Person person) {
		this.person = person;
	}

	public String getJenjang() {
		return jenjang;
	}

	public void setJenjang(String jenjang) {
		this.jenjang = jenjang;
	}

	public String getInstitusi() {
		return institusi;
	}

	public void setInstitusi(String institusi) {
		this.institusi = institusi;
	}

	public String getThMasuk() {
		return thMasuk;
	}

	public void setThMasuk(String thMasuk) {
		this.thMasuk = thMasuk;
	}

	public String getThLulus() {
		return thLulus;
	}

	public void setThLulus(String thLulus) {
		this.thLulus = thLulus;
	}

}