const express = require('express');
const { createClient } = require('@supabase/supabase-js');

const app = express();
app.use(express.json());

const supabaseUrl = 'https://fosjqvczkulmivpdqfyo.supabase.co'; // URL do projeto Supabase
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZvc2pxdmN6a3VsbWl2cGRxZnlvIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODQxOTA5NTUsImV4cCI6MTk5OTc2Njk1NX0.0fZJ4KU-SVBiH0usGWesnWjpAj2LE2CQ_NJSPKbMguA'; // chave do projeto Supabase

const supabase = createClient(supabaseUrl, supabaseKey);

// Consultar todos os produtos
app.get('/produtos', async (req, res) => {
  try {
    const { data, error } = await supabase.from('products').select('*');
    if (error) throw new Error(error.message);

    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Consultar um produto individualmente pelo ID
app.get('/produtos/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { data, error } = await supabase
      .from('produtos')
      .select('*')
      .eq('id', id)
      .single();
    if (error) throw new Error(error.message);

    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Cadastrar um produto
app.post('/produtos', async (req, res) => {
  try {
    const { nome, preco, descricao } = req.body;
    const { data, error } = await supabase
      .from('produtos')
      .insert({ nome, preco, descricao });
    if (error) throw new Error(error.message);

    res.status(201).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Alterar um produto
app.put('/produtos/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { nome, preco, descricao } = req.body;
    const { data, error } = await supabase
      .from('produtos')
      .update({ nome, preco, descricao })
      .eq('id', id);
    if (error) throw new Error(error.message);

    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Deletar um produto
app.delete('/produtos/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { data, error } = await supabase
      .from('produtos')
      .delete()
      .eq('id', id);
    if (error) throw new Error(error.message);

    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
