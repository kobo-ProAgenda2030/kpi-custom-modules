class CustomSession {
  async login(url: string, username: string, password: string) {
    const response: Response = await fetch(`${url}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username,
        password,
      }),
    });
    if (response.status === 200) {
      localStorage.setItem("customSession", await response.text());
    } else {
      throw Error("No autorizado");
    }
  }
  logout() {
    localStorage.removeItem("customSession");
  }
  load(): any | null {
    const session = localStorage.getItem("customSession");
    let response;
    if (session !== null) {
      response = JSON.parse(session);
    }
    return response;
  }
  hasAccess(screen: string): boolean {
    let response = false;
    const currentSession = this.load();
    if (currentSession !== null) {
      if (currentSession.id === "super_admin") {
        currentSession.assets = ["forms", "library", "users", "organizations"];
      } else {
        currentSession.assets = ["users", "organizations"];
      }
      response = currentSession.assets.indexOf(screen) >= 0;
    }
    return response;
  }
}

export const customSession: CustomSession = new CustomSession();
