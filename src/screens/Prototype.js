import React, { Component } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Dimensions,
  StatusBar,
  SafeAreaView,
  Alert,
  Switch
} from 'react-native';

const { width, height } = Dimensions.get('window');

// Icon components (simplified for React Native)
const IconHome = () => <Text style={styles.icon}>🏠</Text>;
const IconChart = () => <Text style={styles.icon}>📊</Text>;
const IconFile = () => <Text style={styles.icon}>📄</Text>;
const IconAlert = () => <Text style={styles.icon}>⚠️</Text>;
const IconThermometer = () => <Text style={styles.icon}>🌡️</Text>;
const IconHeart = () => <Text style={styles.icon}>❤️</Text>;
const IconScale = () => <Text style={styles.icon}>⚖️</Text>;
const IconPlus = () => <Text style={styles.icon}>➕</Text>;
const IconBell = () => <Text style={styles.icon}>🔔</Text>;
const IconUser = () => <Text style={styles.icon}>👤</Text>;
const IconCamera = () => <Text style={styles.icon}>📷</Text>;
const IconShield = () => <Text style={styles.icon}>🛡️</Text>;
const IconTrend = () => <Text style={styles.icon}>📈</Text>;

class PoultryFarmApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: 'dashboard',
      notifications: [
        { id: 1, type: 'warning', message: 'Temperature above normal in Shed A', time: '2 min ago' },
        { id: 2, type: 'info', message: 'Daily feeding completed', time: '1 hour ago' }
      ],
      dailyData: {
        totalBirds: 5847,
        mortality: 12,
        feedConsumption: 2340,
        avgWeight: 1.8,
        temperature: 24.5,
        humidity: 68
      },
      recentLogs: [
        { id: 1, type: 'feeding', shed: 'Shed A', time: '08:30 AM', status: 'completed' },
        { id: 2, type: 'health', shed: 'Shed B', time: '09:15 AM', status: 'checked' },
        { id: 3, type: 'cleaning', shed: 'Shed C', time: '10:00 AM', status: 'in-progress' }
      ],
      formData: {
        selectedShed: 'Shed A - Broilers (Week 4)',
        birdCount: '',
        mortality: '',
        feedConsumed: '',
        waterConsumed: '',
        observations: ''
      },
      alertSettings: {
        temperature: true,
        mortality: true,
        feedLevel: false
      }
    };
  }

  handleFormChange = (field, value) => {
    this.setState({
      formData: {
        ...this.state.formData,
        [field]: value
      }
    });
  };

  handleSaveLog = () => {
    Alert.alert(
      'Success',
      'Daily log saved successfully!',
      [{ text: 'OK', onPress: () => this.setState({ activeTab: 'dashboard' }) }]
    );
  };

  toggleAlertSetting = (setting) => {
    this.setState({
      alertSettings: {
        ...this.state.alertSettings,
        [setting]: !this.state.alertSettings[setting]
      }
    });
  };

  renderDashboard() {
    const { dailyData, recentLogs } = this.state;
    
    return (
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Header Stats */}
        <View style={styles.statsContainer}>
          <View style={[styles.statCard, styles.blueGradient]}>
            <View style={styles.statHeader}>
              <IconHome />
              <Text style={styles.statLabel}>Total Birds</Text>
            </View>
            <Text style={styles.statValue}>{dailyData.totalBirds.toLocaleString()}</Text>
            <Text style={styles.statSubtext}>+2.3% from yesterday</Text>
          </View>
          
          <View style={[styles.statCard, styles.greenGradient]}>
            <View style={styles.statHeader}>
              <IconHeart />
              <Text style={styles.statLabel}>Health Rate</Text>
            </View>
            <Text style={styles.statValue}>99.8%</Text>
            <Text style={styles.statSubtext}>Excellent condition</Text>
          </View>
        </View>

        {/* Environmental Monitoring */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <IconThermometer />
            <Text style={styles.cardTitle}>Environmental Status</Text>
          </View>
          <View style={styles.environmentGrid}>
            <View style={styles.environmentItem}>
              <Text style={[styles.environmentValue, { color: '#FF6B35' }]}>
                {dailyData.temperature}°C
              </Text>
              <Text style={styles.environmentLabel}>Temperature</Text>
            </View>
            <View style={styles.environmentItem}>
              <Text style={[styles.environmentValue, { color: '#4ECDC4' }]}>
                {dailyData.humidity}%
              </Text>
              <Text style={styles.environmentLabel}>Humidity</Text>
            </View>
            <View style={styles.environmentItem}>
              <Text style={[styles.environmentValue, { color: '#45B7D1' }]}>
                {dailyData.avgWeight}kg
              </Text>
              <Text style={styles.environmentLabel}>Avg Weight</Text>
            </View>
          </View>
        </View>

        {/* Quick Actions */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Quick Actions</Text>
          <View style={styles.actionGrid}>
            <TouchableOpacity 
              style={[styles.actionButton, styles.purpleGradient]}
              onPress={() => this.setState({ activeTab: 'data' })}
            >
              <IconPlus />
              <Text style={styles.actionText}>Log Data</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={[styles.actionButton, styles.tealGradient]}>
              <IconCamera />
              <Text style={styles.actionText}>Take Photo</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[styles.actionButton, styles.redGradient]}
              onPress={() => this.setState({ activeTab: 'alerts' })}
            >
              <IconAlert />
              <Text style={styles.actionText}>Report Issue</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={[styles.actionButton, styles.indigoGradient]}>
              <IconShield />
              <Text style={styles.actionText}>Biosecurity</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Recent Activity */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Recent Activity</Text>
          {recentLogs.map(log => (
            <TouchableOpacity key={log.id} style={styles.activityItem}>
              <View style={styles.activityContent}>
                <View style={[
                  styles.statusDot,
                  {
                    backgroundColor: 
                      log.status === 'completed' ? '#10B981' : 
                      log.status === 'in-progress' ? '#F59E0B' : '#3B82F6'
                  }
                ]} />
                <View style={styles.activityText}>
                  <Text style={styles.activityTitle}>
                    {log.type.charAt(0).toUpperCase() + log.type.slice(1)} - {log.shed}
                  </Text>
                  <Text style={styles.activityTime}>{log.time}</Text>
                </View>
              </View>
              <Text style={styles.chevron}>›</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    );
  }

  renderDataEntry() {
    const { formData } = this.state;
    
    return (
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={[styles.headerCard, styles.purpleGradient]}>
          <Text style={styles.headerTitle}>Daily Data Entry</Text>
          <Text style={styles.headerSubtitle}>Record today's farm observations</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Shed Information</Text>
          
          <View style={styles.formGroup}>
            <Text style={styles.label}>Select Shed</Text>
            <View style={styles.pickerContainer}>
              <Text style={styles.pickerText}>{formData.selectedShed}</Text>
              <Text style={styles.chevron}>▼</Text>
            </View>
          </View>
          
          <View style={styles.formRow}>
            <View style={styles.formHalf}>
              <Text style={styles.label}>Bird Count</Text>
              <TextInput
                style={styles.input}
                placeholder="1,250"
                value={formData.birdCount}
                onChangeText={(value) => this.handleFormChange('birdCount', value)}
                keyboardType="numeric"
                placeholderTextColor="#9CA3AF"
              />
            </View>
            <View style={styles.formHalf}>
              <Text style={styles.label}>Mortality</Text>
              <TextInput
                style={styles.input}
                placeholder="3"
                value={formData.mortality}
                onChangeText={(value) => this.handleFormChange('mortality', value)}
                keyboardType="numeric"
                placeholderTextColor="#9CA3AF"
              />
            </View>
          </View>

          <View style={styles.formRow}>
            <View style={styles.formHalf}>
              <Text style={styles.label}>Feed Consumed (kg)</Text>
              <TextInput
                style={styles.input}
                placeholder="850"
                value={formData.feedConsumed}
                onChangeText={(value) => this.handleFormChange('feedConsumed', value)}
                keyboardType="numeric"
                placeholderTextColor="#9CA3AF"
              />
            </View>
            <View style={styles.formHalf}>
              <Text style={styles.label}>Water Consumed (L)</Text>
              <TextInput
                style={styles.input}
                placeholder="1,200"
                value={formData.waterConsumed}
                onChangeText={(value) => this.handleFormChange('waterConsumed', value)}
                keyboardType="numeric"
                placeholderTextColor="#9CA3AF"
              />
            </View>
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Behavioral Observations</Text>
            <TextInput
              style={styles.textArea}
              placeholder="Note any unusual behavior, activity levels, feeding patterns..."
              value={formData.observations}
              onChangeText={(value) => this.handleFormChange('observations', value)}
              multiline={true}
              numberOfLines={4}
              textAlignVertical="top"
              placeholderTextColor="#9CA3AF"
            />
          </View>

          <TouchableOpacity 
            style={[styles.submitButton, styles.purpleGradient]}
            onPress={this.handleSaveLog}
          >
            <Text style={styles.submitText}>Save Daily Log</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }

  renderReports() {
    return (
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={[styles.headerCard, styles.tealGradient]}>
          <Text style={styles.headerTitle}>Reports & Analytics</Text>
          <Text style={styles.headerSubtitle}>View performance insights</Text>
        </View>

        <View style={styles.statsContainer}>
          <View style={styles.reportCard}>
            <View style={styles.reportHeader}>
              <Text style={styles.reportTitle}>Weekly Growth</Text>
              <IconTrend />
            </View>
            <Text style={[styles.reportValue, { color: '#10B981' }]}>+12.5%</Text>
            <Text style={styles.reportSubtext}>Above target</Text>
          </View>

          <View style={styles.reportCard}>
            <View style={styles.reportHeader}>
              <Text style={styles.reportTitle}>Feed Efficiency</Text>
              <IconChart />
            </View>
            <Text style={[styles.reportValue, { color: '#3B82F6' }]}>1.85</Text>
            <Text style={styles.reportSubtext}>FCR ratio</Text>
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Performance Chart</Text>
          <View style={styles.chartPlaceholder}>
            <IconChart />
            <Text style={styles.chartText}>Chart visualization would appear here</Text>
          </View>
        </View>

        <View style={styles.card}>
          <TouchableOpacity style={styles.reportButton}>
            <View style={styles.reportButtonContent}>
              <IconFile />
              <Text style={styles.reportButtonText}>Export Weekly Report</Text>
            </View>
            <Text style={styles.chevron}>›</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.reportButton}>
            <View style={styles.reportButtonContent}>
              <IconChart />
              <Text style={styles.reportButtonText}>Monthly Analytics</Text>
            </View>
            <Text style={styles.chevron}>›</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }

  renderAlerts() {
    const { notifications, alertSettings } = this.state;
    
    return (
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={[styles.headerCard, styles.redGradient]}>
          <Text style={styles.headerTitle}>Alerts & Notifications</Text>
          <Text style={styles.headerSubtitle}>Stay informed about critical events</Text>
        </View>

        {notifications.map(notification => (
          <View key={notification.id} style={styles.alertCard}>
            <View style={styles.alertContent}>
              <View style={[
                styles.alertDot,
                { backgroundColor: notification.type === 'warning' ? '#F59E0B' : '#3B82F6' }
              ]} />
              <View style={styles.alertText}>
                <Text style={styles.alertMessage}>{notification.message}</Text>
                <Text style={styles.alertTime}>{notification.time}</Text>
              </View>
              <IconAlert />
            </View>
          </View>
        ))}

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Alert Settings</Text>
          
          <View style={styles.settingItem}>
            <Text style={styles.settingText}>Temperature alerts</Text>
            <Switch
              value={alertSettings.temperature}
              onValueChange={() => this.toggleAlertSetting('temperature')}
              trackColor={{ false: '#D1D5DB', true: '#10B981' }}
              thumbColor={alertSettings.temperature ? '#FFFFFF' : '#FFFFFF'}
            />
          </View>

          <View style={styles.settingItem}>
            <Text style={styles.settingText}>Mortality alerts</Text>
            <Switch
              value={alertSettings.mortality}
              onValueChange={() => this.toggleAlertSetting('mortality')}
              trackColor={{ false: '#D1D5DB', true: '#10B981' }}
              thumbColor={alertSettings.mortality ? '#FFFFFF' : '#FFFFFF'}
            />
          </View>

          <View style={styles.settingItem}>
            <Text style={styles.settingText}>Feed level alerts</Text>
            <Switch
              value={alertSettings.feedLevel}
              onValueChange={() => this.toggleAlertSetting('feedLevel')}
              trackColor={{ false: '#D1D5DB', true: '#10B981' }}
              thumbColor={alertSettings.feedLevel ? '#FFFFFF' : '#FFFFFF'}
            />
          </View>
        </View>
      </ScrollView>
    );
  }

  render() {
    const { activeTab } = this.state;
    
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="light-content" backgroundColor="#059669" />
        
        {/* Header */}
        <View style={[styles.header, styles.greenGradient]}>
          <View style={styles.headerContent}>
            <View>
              <Text style={styles.appTitle}>FarmKeeper</Text>
              <Text style={styles.appSubtitle}>Smart Poultry Management</Text>
            </View>
            <View style={styles.headerIcons}>
              <View style={styles.notificationContainer}>
                <IconBell />
                <View style={styles.notificationBadge} />
              </View>
              <IconUser />
            </View>
          </View>
        </View>

        {/* Content */}
        <View style={styles.mainContent}>
          {activeTab === 'dashboard' && this.renderDashboard()}
          {activeTab === 'data' && this.renderDataEntry()}
          {activeTab === 'reports' && this.renderReports()}
          {activeTab === 'alerts' && this.renderAlerts()}
        </View>

        {/* Bottom Navigation */}
        <View style={styles.bottomNav}>
          {[
            { id: 'dashboard', icon: IconHome, label: 'Dashboard' },
            { id: 'data', icon: IconPlus, label: 'Data Entry' },
            { id: 'reports', icon: IconChart, label: 'Reports' },
            { id: 'alerts', icon: IconBell, label: 'Alerts' }
          ].map(tab => (
            <TouchableOpacity
              key={tab.id}
              style={[
                styles.tabButton,
                activeTab === tab.id && styles.activeTab
              ]}
              onPress={() => this.setState({ activeTab: tab.id })}
            >
              <tab.icon />
              <Text style={[
                styles.tabLabel,
                activeTab === tab.id && styles.activeTabLabel
              ]}>
                {tab.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    paddingTop: 40,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  appTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  appSubtitle: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.9)',
    marginTop: 2,
  },
  headerIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  notificationContainer: {
    position: 'relative',
    marginRight: 15,
  },
  notificationBadge: {
    position: 'absolute',
    top: -2,
    right: -2,
    width: 8,
    height: 8,
    backgroundColor: '#EF4444',
    borderRadius: 4,
  },
  mainContent: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 100,
  },
  headerCard: {
    padding: 20,
    borderRadius: 16,
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.9)',
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
    marginLeft: 8,
  },
  statsContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  statCard: {
    flex: 1,
    padding: 16,
    borderRadius: 16,
    marginHorizontal: 4,
  },
  statHeader: {
    flexDirection: 'row',
    // justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  statLabel: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 4,
  },
  statSubtext: {
    fontSize: 10,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  environmentGrid: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  environmentItem: {
    alignItems: 'center',
  },
  environmentValue: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  environmentLabel: {
    fontSize: 12,
    color: '#6B7280',
  },
  actionGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 16,
  },
  actionButton: {
    width: '48%',
    aspectRatio: 2,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    margin: '1%',
  },
  actionText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 12,
    marginTop: 4,
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#F9FAFB',
    padding: 16,
    borderRadius: 12,
    marginBottom: 8,
  },
  activityContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 12,
  },
  activityText: {
    flex: 1,
  },
  activityTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1F2937',
  },
  activityTime: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 2,
  },
  chevron: {
    fontSize: 16,
    color: '#9CA3AF',
  },
  formGroup: {
    marginBottom: 16,
  },
  formRow: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  formHalf: {
    flex: 1,
    marginHorizontal: 4,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: '#374151',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 12,
    padding: 12,
    fontSize: 16,
    backgroundColor: 'white',
  },
  textArea: {
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 12,
    padding: 12,
    fontSize: 16,
    backgroundColor: 'white',
    height: 100,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 12,
    padding: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  pickerText: {
    fontSize: 16,
    color: '#1F2937',
  },
  submitButton: {
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginTop: 8,
  },
  submitText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  reportCard: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 16,
    marginHorizontal: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  reportHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  reportTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1F2937',
  },
  reportValue: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  reportSubtext: {
    fontSize: 12,
    color: '#6B7280',
  },
  chartPlaceholder: {
    height: 120,
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
  },
  chartText: {
    color: '#6B7280',
    marginTop: 8,
    textAlign: 'center',
  },
  reportButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    marginBottom: 8,
  },
  reportButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  reportButtonText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1F2937',
    marginLeft: 12,
  },
  alertCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  alertContent: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  alertDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginTop: 6,
    marginRight: 12,
  },
  alertText: {
    flex: 1,
  },
  alertMessage: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1F2937',
    marginBottom: 4,
  },
  alertTime: {
    fontSize: 12,
    color: '#6B7280',
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  settingText: {
    fontSize: 16,
    color: '#1F2937',
  },
  bottomNav: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    paddingVertical: 8,
    paddingHorizontal: 4,
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 8,
    borderRadius: 8,
    marginHorizontal: 2,
  },
  activeTab: {
    backgroundColor: '#D1FAE5',
  },
  tabLabel: {
    fontSize: 10,
    fontWeight: '500',
    color: '#6B7280',
    marginTop: 4,
  },
  activeTabLabel: {
    color: '#059669',
  },
  icon: {
    fontSize: 18,
  },
  // Gradient styles (simulated with solid colors for React Native)
  greenGradient: {
    backgroundColor: '#059669',
  },
  blueGradient: {
    backgroundColor: '#3B82F6',
  },
  purpleGradient: {
    backgroundColor: '#8B5CF6',
  },
  tealGradient: {
    backgroundColor: '#14B8A6',
  },
  redGradient: {
    backgroundColor: '#EF4444',
  },
  indigoGradient: {
    backgroundColor: '#6366F1',
  },
});

export default PoultryFarmApp;