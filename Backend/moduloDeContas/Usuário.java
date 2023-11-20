package moduloDeContas;

public interface Usuário {

	private String email;

	private String nome;

	private String senha;

	public abstract String getEmail();

	public abstract String getNome();

	public abstract String getSenha();

	public abstract boolean setEmail(String email);

	public abstract boolean setNome(String nome);

	public abstract boolean setSenha(String senha);

}
