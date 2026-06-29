# importando as bibliotecas necessárias
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns

# %%%
# carrega os dados
df = pd.read_excel('Dados - Case Modelagem.xlsx')

# formato das variáveis, categóricas, escala dos dados
df.head()

# %%%
# informações gerais sobre os dados
# dimensão
df.shape

# %%
# tipos de colunas
df.info()
# %%
# chegando os missings
df.isnull().sum()
# %%
'''A base não apresentou valores ausentes, eliminando a necessidade de técnicas de imputação no pré-processamento.'''
# %%
# verificando se tem duplicatas
duplicados = df.duplicated().sum()

print(f'\nQuantidade de registros duplicados: {duplicados}')

# Percentual de duplicados
percentual_duplicados = (duplicados / len(df)) * 100

print(f'Percentual de duplicados: {percentual_duplicados:.2f}%')

# %%
# removendo duplicatas
df = df.drop_duplicates()

print('\nShape após remoção de duplicados:')
print(df.shape)
# %%
# estatísticas descritivas
display(df.describe())

# %%
# distribuição da variável target
plt.figure(figsize=(8,5))

sns.countplot(
    x=df['score_inadimplencia']
)

plt.title('Distribuição do Score de Inadimplência')
plt.xlabel('Score de Inadimplência')
plt.ylabel('Quantidade')
plt.show()
# %%
# histogramas da variaveis numéricas
df.hist(
    figsize=(18,14),
    bins=25
)

plt.tight_layout()
plt.show()
# %%%
# boxplot para identificar outliers
plt.figure(figsize=(18,8))

sns.boxplot(
    data=df.select_dtypes(include=np.number)
)

plt.xticks(rotation=90)
plt.title('Boxplot das Variáveis Numéricas')
plt.show()
# %%%
# -------- score_mercado --------

Q1 = df['score_mercado'].quantile(0.25)
Q3 = df['score_mercado'].quantile(0.75)

IQR = Q3 - Q1

limite_superior = Q3 + (1.5 * IQR)

df = df[
    df['score_mercado'] <= limite_superior
]

# -------- alavancagem --------

Q1 = df['alavancagem'].quantile(0.25)
Q3 = df['alavancagem'].quantile(0.75)

IQR = Q3 - Q1

limite_superior = Q3 + (1.5 * IQR)

df = df[
    df['alavancagem'] <= limite_superior
]

print('\nShape após tratamento de outliers:')
print(df.shape)
# %%
# estatísticas descritivas após tratamento de outliers
display(df.describe())

# %%%
# heatmap de correlação
plt.figure(figsize=(12,8))

sns.heatmap(
    df.corr(numeric_only=True),
    annot=True,
    cmap='coolwarm'
)

plt.title('Correlação entre Variáveis')

plt.show()
# %%%
# análise das principais variáveis vs target

variaveis_importantes = [
    'comprometimento_renda',
    'saldo_rotativo',
    'limite_utilizado',
    'consultas_bureau',
    'alavancagem',
    'score_mercado'
]

for var in variaveis_importantes:

    plt.figure(figsize=(8,5))

    sns.boxplot(
        x=df['score_inadimplencia'],
        y=df[var]
    )

    plt.title(f'{var} vs Score de Inadimplência')

    plt.show()
# %%%
# analise da vaiavel categorica 

plt.figure(figsize=(6,4))

sns.countplot(
    x=df['tipo_produto']
)

plt.title('Distribuição por Tipo de Produto')

plt.show()
# %%%
# encoding da variável categorica
df['tipo_produto'] = df['tipo_produto'].map({
    'Empréstimo Pessoal':0,
    'Consignado':1
})
# %%
# criação de uma  variável binaria de risco 
df['inadimplente'] = (
    df['score_inadimplencia'] >= 7
).astype(int)
# %%
from sklearn.ensemble import RandomForestClassifier

# %%
# feature importance preliminar 
X = df.drop(
    ['score_inadimplencia', 'inadimplente'],
    axis=1
)

y = df['inadimplente']

model = RandomForestClassifier(
    random_state=42
)

model.fit(X, y)

importance = pd.DataFrame({

    'Variavel': X.columns,

    'Importancia': model.feature_importances_

})

importance = importance.sort_values(
    by='Importancia',
    ascending=False
)

print('\nFeature Importance:')
display(importance)

# %%
# visualização das features mais importantes
plt.figure(figsize=(10,6))

sns.barplot(
    data=importance,
    x='Importancia',
    y='Variavel'
)

plt.title('Importância das Variáveis')

plt.show()
# %%%
df.to_csv(
    'data/processed/base_tratada.csv',
    index=False
)
# %%
df.to_parquet(
    'data/processed/base_tratada.parquet',
    index=False
)

# %%