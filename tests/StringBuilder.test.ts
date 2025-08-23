import { describe, it, expect } from 'vitest';
import StringBuilder from '../src/StringBuilder';

describe('StringBuilder', () => {

	describe('constructor', () => {
		it('should create empty StringBuilder', () => {
			const sb = new StringBuilder();
			expect(sb.toString()).toBe('');
			expect(sb.isEmpty).toBe(true);
		});

		it('should initialize with values', () => {
			const sb = new StringBuilder('hello', ' ', 'world');
			expect(sb.toString()).toBe('hello world');
			expect(sb.isEmpty).toBe(false);
		});

		it('should handle null/undefined in constructor', () => {
			const sb = new StringBuilder('a', null, 'b', undefined, 'c');
			expect(sb.toString()).toBe('abc');
		});
	});

	describe('append methods', () => {
		it('should append strings', () => {
			const sb = new StringBuilder();
			sb.append('a', 'b', 'c');
			sb.append('1', '2', '3');
			expect(sb.toString()).toBe('abc123');
		});

		it('should append different types', () => {
			const sb = new StringBuilder();
			sb.append(123, true, false);
			expect(sb.toString()).toBe('123truefalse');
		});

		it('should handle objects with toString', () => {
			const sb = new StringBuilder();
			const obj = { toString: () => 'custom' };
			sb.append(obj);
			expect(sb.toString()).toBe('custom');
		});

		it('should handle functions', () => {
			const sb = new StringBuilder();
			const func = function() { return 'test'; };
			sb.append(func);
			expect(sb.toString()).toContain('function');
		});

		it('should skip null/undefined items', () => {
			const sb = new StringBuilder();
			sb.append('a', null, 'b', undefined, 'c');
			expect(sb.toString()).toBe('abc');
		});

		it('should chain append calls', () => {
			const sb = new StringBuilder();
			const result = sb.append('a').append('b').append('c');
			expect(result).toBe(sb); // Should return this for chaining
			expect(sb.toString()).toBe('abc');
		});
	});

	describe('appendSingle', () => {
		it('should append single item', () => {
			const sb = new StringBuilder();
			sb.appendSingle('test');
			expect(sb.toString()).toBe('test');
		});

		it('should skip null/undefined', () => {
			const sb = new StringBuilder();
			sb.appendSingle('a');
			sb.appendSingle(null);
			sb.appendSingle('b');
			sb.appendSingle(undefined);
			expect(sb.toString()).toBe('ab');
		});

		it('should chain appendSingle calls', () => {
			const sb = new StringBuilder();
			const result = sb.appendSingle('a').appendSingle('b');
			expect(result).toBe(sb);
			expect(sb.toString()).toBe('ab');
		});
	});

	describe('appendLine methods', () => {
		it('should append lines with default newline', () => {
			const sb = new StringBuilder();
			sb.appendLine('first', 'second');
			expect(sb.toString()).toBe('first\nsecond\n');
		});

		it('should append lines with custom newline', () => {
			const sb = new StringBuilder();
			sb.setNewLine('\r\n');
			sb.appendLine('first', 'second');
			expect(sb.toString()).toBe('first\r\nsecond\r\n');
		});

		it('should skip null/undefined in appendLine', () => {
			const sb = new StringBuilder();
			sb.appendLine('a', null, 'b', undefined);
			expect(sb.toString()).toBe('a\nb\n');
		});

		it('should chain appendLine calls', () => {
			const sb = new StringBuilder();
			const result = sb.appendLine('a').appendLine('b');
			expect(result).toBe(sb);
		});

		it('should work with appendLines array method', () => {
			const sb = new StringBuilder();
			sb.appendLines(['first', 'second']);
			expect(sb.toString()).toBe('first\nsecond\n');
		});
	});

	describe('newLine handling', () => {
		it('should have default newline', () => {
			const sb = new StringBuilder();
			expect(sb.newLine).toBe('\n');
		});

		it('should set custom newline', () => {
			const sb = new StringBuilder();
			const result = sb.setNewLine('\r\n');
			expect(result).toBe(sb); // Should chain
			expect(sb.newLine).toBe('\r\n');
		});

		it('should throw error for null newline', () => {
			const sb = new StringBuilder();
			expect(() => sb.setNewLine(null as any)).toThrow('\'newLine\' cannot be null or undefined.');
		});

		it('should throw error for undefined newline', () => {
			const sb = new StringBuilder();
			expect(() => sb.setNewLine(undefined as any)).toThrow('\'newLine\' cannot be null or undefined.');
		});
	});

	describe('utility methods', () => {
		it('should check isEmpty correctly', () => {
			const sb = new StringBuilder();
			expect(sb.isEmpty).toBe(true);
			
			sb.append('test');
			expect(sb.isEmpty).toBe(false);
			
			sb.clear();
			expect(sb.isEmpty).toBe(true);
		});

		it('should join with custom delimiter', () => {
			const sb = new StringBuilder();
			sb.append('a', 'b', 'c');
			expect(sb.join('-')).toBe('a-b-c');
			expect(sb.join(', ')).toBe('a, b, c');
		});

		it('should clear content', () => {
			const sb = new StringBuilder();
			sb.append('test');
			expect(sb.isEmpty).toBe(false);
			
			sb.clear();
			expect(sb.isEmpty).toBe(true);
			expect(sb.toString()).toBe('');
		});

		it('should dispose and clear', () => {
			const sb = new StringBuilder();
			sb.append('test');
			
			sb.dispose();
			expect(sb.isEmpty).toBe(true);
			expect(sb.toString()).toBe('');
		});
	});

	describe('toString caching', () => {
		it('should cache toString result', () => {
			const sb = new StringBuilder();
			sb.append('test');
			
			const first = sb.toString();
			const second = sb.toString();
			expect(first).toBe(second);
			expect(first).toBe('test');
		});

		it('should invalidate cache on new content', () => {
			const sb = new StringBuilder();
			sb.append('test');
			expect(sb.toString()).toBe('test');
			
			sb.append('more');
			expect(sb.toString()).toBe('testmore');
		});
	});

	describe('edge cases', () => {
		it('should handle empty string appends', () => {
			const sb = new StringBuilder();
			sb.append('', 'test', '');
			expect(sb.toString()).toBe('test');
		});

		it('should handle mixed null/undefined/empty', () => {
			const sb = new StringBuilder();
			sb.append('a', '', null, 'b', undefined, '', 'c');
			expect(sb.toString()).toBe('abc');
		});

		it('should work with numbers and booleans', () => {
			const sb = new StringBuilder();
			sb.append(0, 1, true, false);
			expect(sb.toString()).toBe('01truefalse');
		});
	});
});
