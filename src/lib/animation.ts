export const easing = {
  // Ação mecânica: rápida entrada, parada precisa
  mechanical:    [0.25, 0.1, 0.25, 1.0],    // ease padrão
  // Metal pesado descendo: aceleração gradual
  metalDrop:     [0.4, 0.0, 0.2, 1.0],       // ease-in-out
  // Surgimento de um painel: rápido no início
  surfaceReveal: [0.0, 0.0, 0.2, 1.0],       // ease-out
  // Fechamento / retração
  surfaceRetract:[0.4, 0.0, 1.0, 1.0],       // ease-in
} as const;
