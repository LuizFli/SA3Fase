import { Box, Button, IconButton, Typography, useTheme} from "@mui/material";
import { tokens } from "../../theme";
import Header from "../components/Header";
import LineChart from "../components/LineChart";
import StatBox from "../components/StatBox";

const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  // Dados mockados simplificados
  const statsData = [
    {
      title: "15,842",
      subtitle: "Interações Mensais",
      progress: 0.68,
      increase: "+22%",
      icon: "📈",
      color: colors.greenAccent[500]
    },
    {
      title: "R$ 89,475",
      subtitle: "Receita Trimestral",
      progress: 0.45,
      increase: "+18%",
      icon: "💰",
      color: colors.blueAccent[500]
    },
    {
      title: "1,248",
      subtitle: "Novos Usuários",
      progress: 0.32,
      increase: "+8%",
      icon: "👥",
      color: colors.redAccent[500]
    }
  ];

  const recentActivities = [
    { id: 1, action: "Atualização de sistema", time: "2 horas atrás", status: "Concluído" },
    { id: 2, action: "Nova integração API", time: "1 dia atrás", status: "Em progresso" },
    { id: 3, action: "Backup de dados", time: "3 dias atrás", status: "Concluído" }
  ];

  return (
    <Box m="20px">
      {/* HEADER SIMPLIFICADO */}
      <Box display="flex" justifyContent="space-between" alignItems="center" mb="30px">
        <Header title="VISÃO GERAL" subtitle="Bem-vindo ao painel de controle 2025" />
        
        <Button
          variant="contained"
          sx={{
            backgroundColor: colors.blueAccent[600],
            color: colors.grey[100],
            borderRadius: "8px",
            padding: "10px 20px",
            textTransform: "none",
            fontSize: "0.875rem",
            boxShadow: "0 2px 10px rgba(0,0,0,0.1)"
          }}
        >
          Exportar Dados
        </Button>
      </Box>

      {/* ESTATÍSTICAS PRINCIPAIS */}
      <Box
        display="grid"
        gridTemplateColumns="repeat(auto-fit, minmax(240px, 1fr))"
        gap="20px"
        mb="30px"
      >
        {statsData.map((stat, i) => (
          <Box
            key={i}
            backgroundColor={colors.primary[400]}
            borderRadius="12px"
            p="20px"
            boxShadow="0 4px 20px rgba(0,0,0,0.05)"
          >
            <StatBox
              title={stat.title}
              subtitle={stat.subtitle}
              progress={stat.progress}
              increase={stat.increase}
              icon={
                <Typography 
                  variant="h4" 
                  sx={{ color: stat.color }}
                >
                  {stat.icon}
                </Typography>
              }
            />
          </Box>
        ))}
      </Box>

      {/* GRÁFICO PRINCIPAL */}
      <Box
        display="grid"
        gridTemplateColumns="1fr"
        gap="20px"
        mb="30px"
      >
        <Box
          backgroundColor={colors.primary[400]}
          borderRadius="12px"
          p="20px"
          boxShadow="0 4px 20px rgba(0,0,0,0.05)"
        >
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            mb="20px"
          >
            <Typography variant="h5" fontWeight="600" color={colors.grey[100]}>
              Desempenho Anual (2025)
            </Typography>
            <IconButton>
              <Typography variant="h6">⚙️</Typography>
            </IconButton>
          </Box>
          <Box height="300px">
            <LineChart isDashboard={true} />
          </Box>
        </Box>
      </Box>

      {/* ATIVIDADES RECENTES */}
      <Box
        backgroundColor={colors.primary[400]}
        borderRadius="12px"
        p="20px"
        boxShadow="0 4px 20px rgba(0,0,0,0.05)"
      >
        <Typography variant="h5" fontWeight="600" color={colors.grey[100]} mb="20px">
          Atividades Recentes
        </Typography>
        
        {recentActivities.map((activity) => (
          <Box
            key={activity.id}
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            py="15px"
            borderBottom={`1px solid ${colors.primary[500]}`}
          >
            <Box>
              <Typography fontWeight="600" color={colors.grey[100]}>
                {activity.action}
              </Typography>
              <Typography variant="body2" color={colors.grey[300]}>
                {activity.time}
              </Typography>
            </Box>
            <Box
              px="12px"
              py="4px"
              borderRadius="20px"
              backgroundColor={
                activity.status === "Concluído" 
                  ? colors.greenAccent[500] 
                  : colors.blueAccent[500]
              }
            >
              <Typography variant="body2" color={colors.grey[100]}>
                {activity.status}
              </Typography>
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default Dashboard;