import { Component, type ErrorInfo, type ReactNode } from 'react';
import { StyleSheet, Text, View } from 'react-native';

type Props = { children: ReactNode };
type State = { error: Error | null };

/** Catch a render crash so the preview iframe does not reload in a loop. */
export class ErrorBoundary extends Component<Props, State> {
  state: State = { error: null };

  static getDerivedStateFromError(error: Error): State {
    return { error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('MediGryd render error', error, info.componentStack);
  }

  render() {
    if (!this.state.error) return this.props.children;
    return (
      <View style={styles.box}>
        <Text style={styles.title}>Something went wrong</Text>
        <Text style={styles.body}>{this.state.error.message}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  box: { flex: 1, padding: 24, justifyContent: 'center', backgroundColor: '#A9E4F8' },
  title: { fontSize: 20, fontWeight: '700', marginBottom: 8, color: '#111' },
  body: { fontSize: 14, color: '#111' },
});
