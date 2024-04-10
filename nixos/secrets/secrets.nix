let
  vm-deploy = "ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIAhd5EhjpVyO/umOUI3LpvLh6+llnX1acBaSDOx3P4MQ";
  desktop = "ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAILXtwwCwAQNOW6YZuMpUoOzEGmDKK5W4WQpKd21jKtvw willsonhaw@gmail.com";
  laptop = "ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIITr9QNRc0XdSz1K8gxMeeH8FRDygSGI2ZTksoTe7BKX";

  systems = [ desktop laptop ];
in
{
  "luk2.age".publicKeys = systems;
}
