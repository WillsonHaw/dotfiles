{
  lib,
  stdenv,
  fetchFromGitHub,
  kernel,
  kernelModuleMakeFlags,
}:

stdenv.mkDerivation {
  pname = "intel-cvs";
  version = "unstable-2026-05-07";

  src = fetchFromGitHub {
    owner = "intel";
    repo = "vision-drivers";
    rev = "845d6f8bdf66ff1f455901da9de5e00a53a83dce";
    hash = "sha256-i/qZN8GXyqaE6n6pRtxQLdmGhmPDjoArzVvflDmwuSs=";
  };

  nativeBuildInputs = kernel.moduleBuildDependencies;

  makeFlags = kernelModuleMakeFlags ++ [
    "KERNELRELEASE=${kernel.modDirVersion}"
    "KERNEL_SRC=${kernel.dev}/lib/modules/${kernel.modDirVersion}/build"
  ];

  enableParallelBuilding = true;

  preInstall = ''
    sed -i -e "s,INSTALL_MOD_DIR=,INSTALL_MOD_PATH=$out INSTALL_MOD_DIR=," Makefile
  '';

  installTargets = [ "modules_install" ];

  meta = {
    homepage = "https://github.com/intel/vision-drivers";
    description = "Intel Computer Vision System (CVS) driver, needed to complete the IPU7 camera's ACPI power-sequencing chain on some platforms (e.g. Panther Lake)";
    license = lib.licenses.gpl2Only;
    platforms = [ "x86_64-linux" ];
    broken = kernel.kernelOlder "6.7";
  };
}
