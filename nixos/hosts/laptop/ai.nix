{ ... }:

{
  noodles.ai = {
    ollama.enable = true;
    open-webui.enable = true;
    invokeai.enable = true;

    # Traefik (10.0.0.9 plus its known LAN addresses) and Tailscale's CGNAT range.
    allowedSources = [
      "10.0.0.9"
      "10.0.0.123"
      "10.0.0.145"
      "10.0.33.245"
      "100.64.0.0/10"
    ];
  };
}
