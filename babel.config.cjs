module.exports = (api) => {
  const isTest = api.env('test');

  return {
    presets: [
      [
        '@babel/preset-env',
        {
          targets: isTest ? { node: 'current' } : undefined,
          useBuiltIns: isTest ? false : 'usage',
          corejs: isTest ? undefined : 3,
          modules: isTest ? 'commonjs' : false,
        },
      ],
    ],
  };
};